import { connectDB } from "../config/db";
import { userService } from "../services/user.service";
import { UserType } from "@/backend/types/user.types";
import { sendEmail } from "@/backend/utils/sendEmail";
import { transactionService } from "@/backend/services/transaction.service";
import { buildWalletTopUpEmail } from "@/backend/utils/emailTemplates";
import { generateTokenInvoicePDF } from "@/backend/utils/generateTokenInvoice";
import { resolveBalanceGBP, round2, syncLegacyTokens } from "@/utils/wallet";

export const userController = {
    async topUpWallet(
        userId: string,
        amountGBP: number,
        paymentDetails?: {
            chargedAmount?: number | null;
            chargedCurrency?: string | null;
            referenceId?: string | null;
        }
    ): Promise<UserType> {
        await connectDB();

        const referenceId = paymentDetails?.referenceId?.trim() || null;
        const gbpAmount = round2(amountGBP);

        if (referenceId) {
            const existingTx = await transactionService.findByPaymentReference(referenceId);
            if (existingTx) {
                const user = await userService.getUserById(userId);
                if (!user) throw new Error("User not found");
                return formatUser(user);
            }
        }

        const user = await userService.addBalanceGBP(userId, gbpAmount);
        const balanceGBP = resolveBalanceGBP(user);

        let transaction;
        try {
            transaction = await transactionService.record(
                user._id,
                user.email,
                syncLegacyTokens(gbpAmount),
                "add",
                syncLegacyTokens(balanceGBP),
                referenceId
            );
        } catch (error) {
            const isDuplicateReference =
                referenceId &&
                error &&
                typeof error === "object" &&
                "code" in error &&
                (error as { code?: number }).code === 11000;

            if (isDuplicateReference) {
                const existingUser = await userService.getUserById(userId);
                if (!existingUser) throw new Error("User not found");
                return formatUser(existingUser);
            }

            throw error;
        }

        const invoiceNumber = `QEL-${String(transaction._id).slice(-8).toUpperCase()}`;
        const pdf = await generateTokenInvoicePDF({
            invoiceNumber,
            createdAt: new Date(transaction.createdAt),
            customerName: `${user.firstName} ${user.lastName}`.trim(),
            customerEmail: user.email,
            tokens: syncLegacyTokens(gbpAmount),
            chargedAmount: paymentDetails?.chargedAmount ?? null,
            chargedCurrency: paymentDetails?.chargedCurrency ?? null,
            balanceAfter: syncLegacyTokens(balanceGBP),
            referenceId: paymentDetails?.referenceId ?? null,
        });

        const purchaseEmail = buildWalletTopUpEmail({
            firstName: user.firstName,
            amountGBP: gbpAmount,
            balanceAfterGBP: balanceGBP,
            chargedAmount: paymentDetails?.chargedAmount ?? null,
            chargedCurrency: paymentDetails?.chargedCurrency ?? null,
            referenceId: paymentDetails?.referenceId ?? null,
            invoiceNumber,
        });

        await sendEmail(
            user.email,
            purchaseEmail.subject,
            purchaseEmail.text,
            purchaseEmail.html,
            [
                {
                    filename: `${invoiceNumber}.pdf`,
                    type: "application/pdf",
                    data: pdf,
                },
            ]
        );

        return formatUser(user);
    },

    /** @deprecated Use topUpWallet */
    async buyTokens(
        userId: string,
        amount: number,
        paymentDetails?: {
            chargedAmount?: number | null;
            chargedCurrency?: string | null;
            referenceId?: string | null;
        }
    ): Promise<UserType> {
        return userController.topUpWallet(userId, round2(amount / 100), paymentDetails);
    },

    async spendFromWallet(userId: string, amountGBP: number, reason?: string): Promise<UserType> {
        await connectDB();

        const user = await userService.spendBalanceGBP(userId, round2(amountGBP));
        const balanceGBP = resolveBalanceGBP(user);

        await transactionService.record(
            user._id,
            user.email,
            syncLegacyTokens(amountGBP),
            "spend",
            syncLegacyTokens(balanceGBP)
        );

        sendEmail(
            user.email,
            "Wallet debit",
            `£${amountGBP.toFixed(2)} was debited from your wallet${reason ? ` for ${reason}` : ""}. Your balance is now £${balanceGBP.toFixed(2)}.`
        );

        return formatUser(user);
    },

    /** @deprecated Use spendFromWallet — amount in legacy tokens. */
    async spendTokens(userId: string, amount: number, reason?: string): Promise<UserType> {
        return userController.spendFromWallet(userId, round2(amount / 100), reason);
    },
};

function formatUser(user: any): UserType {
    const balanceGBP = resolveBalanceGBP(user);
    return {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        balanceGBP,
        tokens: syncLegacyTokens(balanceGBP),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
