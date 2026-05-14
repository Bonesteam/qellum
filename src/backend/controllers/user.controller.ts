import { connectDB } from "../config/db";
import { userService } from "../services/user.service";
import { User } from "@/backend/models/user.model";
import { UserType } from "@/backend/types/user.types";
import { sendEmail } from "@/backend/utils/sendEmail";
import { transactionService } from "@/backend/services/transaction.service";
import { buildTokenPurchaseEmail } from "@/backend/utils/emailTemplates";
import { generateTokenInvoicePDF } from "@/backend/utils/generateTokenInvoice";

export const userController = {
    async buyTokens(
        userId: string,
        amount: number,
        paymentDetails?: {
            chargedAmount?: number | null;
            chargedCurrency?: string | null;
            referenceId?: string | null;
        }
    ): Promise<UserType> {
        await connectDB();

        const user = await userService.addTokens(userId, amount);

        console.log("💳 Adding tokens for user:", userId);
        const transaction = await transactionService.record(user._id, user.email, amount, "add", user.tokens);
        console.log("✅ Transaction created successfully");

        try {
            const invoiceNumber = `QEL-${String(transaction._id).slice(-8).toUpperCase()}`;
            const pdf = await generateTokenInvoicePDF({
                invoiceNumber,
                createdAt: new Date(transaction.createdAt),
                customerName: `${user.firstName} ${user.lastName}`.trim(),
                customerEmail: user.email,
                tokens: amount,
                chargedAmount: paymentDetails?.chargedAmount ?? null,
                chargedCurrency: paymentDetails?.chargedCurrency ?? null,
                balanceAfter: user.tokens,
                referenceId: paymentDetails?.referenceId ?? null,
            });

            const purchaseEmail = buildTokenPurchaseEmail({
                firstName: user.firstName,
                tokens: amount,
                balanceAfter: user.tokens,
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
        } catch (err) {
            console.error("⚠️ Token crediting succeeded but confirmation email failed for user:", userId, err);
        }

        return formatUser(user);
    },

    async spendTokens(userId: string, amount: number, reason?: string): Promise<UserType> {
        await connectDB();

        const user = await userService.getUserById(userId);
        if (!user) throw new Error("User not found");
        if ((user.tokens || 0) < amount) throw new Error("Not enough tokens");

        await User.updateOne({ _id: userId }, { $inc: { tokens: -amount } });
        user.tokens -= amount;

        await transactionService.record(user._id, user.email, amount, "spend", user.tokens);

        sendEmail(
            user.email,
            "Tokens Spent",
            `You have spent ${amount} tokens${reason ? ` for ${reason}` : ""}. Your new balance is ${user.tokens} tokens.`
        );

        return formatUser(user);
    },
};

function formatUser(user: any): UserType {
    return {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        tokens: user.tokens,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
