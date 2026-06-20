import { connectDB } from "@/backend/config/db";
import { SpoyntPayment } from "@/backend/models/spoyntPayment.model";
import { userController } from "@/backend/controllers/user.controller";
import { userService } from "@/backend/services/user.service";
import { transactionService } from "@/backend/services/transaction.service";

type SupportedCurrency = "GBP" | "EUR" | "USD";

type UpsertCreatedInvoiceInput = {
    cpi: string;
    referenceId: string;
    userId: string;
    tokens: number;
    requestedCurrency: SupportedCurrency;
    requestedAmount: number;
    chargedCurrency: SupportedCurrency;
    chargedAmount: number;
    status: string;
    resolution: string | null;
    providerUpdatedAt: number | null;
};

type ProcessInvoiceInput = UpsertCreatedInvoiceInput;

type CreditedResult = {
    state: "credited";
    tokens: number;
    balanceAfter: number | null;
    alreadyCredited: boolean;
    providerStatus: string;
    providerResolution: string | null;
};

type PendingOrFailedResult = {
    state: "pending" | "failed";
    status: string;
    resolution: string | null;
    alreadyCredited?: boolean;
    providerStatus: string;
    providerResolution: string | null;
};

type InvalidResult = {
    state: "invalid";
    message: string;
};

function normalizeOutcome(status: string, resolution: string | null) {
    const normalizedStatus = status.trim().toLowerCase().replace(/[\s-]+/g, "_");
    const normalizedResolution = resolution?.trim().toLowerCase().replace(/[\s-]+/g, "_") ?? null;

    const successStatuses = new Set([
        "processed",
        "paid",
        "captured",
        "completed",
        "success",
        "successful",
        "settled",
        "process_pending",
    ]);
    const failedStatuses = new Set([
        "failed",
        "declined",
        "rejected",
        "cancelled",
        "canceled",
        "expired",
        "error",
        "process_failed",
        "chargeback",
        "refunded",
        "voided",
    ]);
    const pendingStatuses = new Set([
        "created",
        "invoked",
        "pending",
        "processing",
        "authorized",
        "authorizing",
        "verification",
        "review",
        "awaiting_customer",
        "awaiting_redirect_result",
    ]);
    const successResolutions = new Set(["success", "successful", "completed", "approved"]);
    const failedResolutions = new Set([
        "fail",
        "failed",
        "declined",
        "rejected",
        "cancelled",
        "canceled",
        "expired",
        "error",
    ]);
    const pendingResolutions = new Set(["pending", "in_progress", "processing", "review"]);

    if (failedStatuses.has(normalizedStatus)) {
        return "failed";
    }

    if (successStatuses.has(normalizedStatus)) {
        return "credited";
    }

    if (pendingStatuses.has(normalizedStatus)) {
        return "pending";
    }

    if (normalizedResolution !== null && failedResolutions.has(normalizedResolution)) {
        return "failed";
    }

    if (normalizedResolution !== null && successResolutions.has(normalizedResolution)) {
        return "credited";
    }

    if (normalizedResolution === null || pendingResolutions.has(normalizedResolution)) {
        return "pending";
    }

    return "failed";
}

export const spoyntService = {
    async getPaymentByCpi(cpi: string) {
        await connectDB();
        return SpoyntPayment.findOne({ cpi }).lean();
    },

    async getPaymentByReference(referenceId: string) {
        await connectDB();
        return SpoyntPayment.findOne({ referenceId }).lean();
    },

    async upsertCreatedInvoice(input: UpsertCreatedInvoiceInput) {
        await connectDB();

        return SpoyntPayment.findOneAndUpdate(
            { referenceId: input.referenceId },
            {
                $set: {
                    cpi: input.cpi,
                    userId: input.userId,
                    tokens: input.tokens,
                    requestedCurrency: input.requestedCurrency,
                    requestedAmount: input.requestedAmount,
                    chargedCurrency: input.chargedCurrency,
                    chargedAmount: input.chargedAmount,
                    status: input.status,
                    resolution: input.resolution,
                    providerUpdatedAt: input.providerUpdatedAt,
                    lastError: null,
                },
                $setOnInsert: {
                    creditStatus: "pending",
                    creditedAt: null,
                    balanceAfter: null,
                },
            },
            { upsert: true, new: true }
        );
    },

    async processInvoice(input: ProcessInvoiceInput): Promise<CreditedResult | PendingOrFailedResult | InvalidResult> {
        if (!input.referenceId) {
            return { state: "invalid", message: "Missing payment reference" };
        }

        if (!input.userId) {
            return { state: "invalid", message: "Missing payment user" };
        }

        if (!Number.isFinite(input.tokens) || input.tokens < 1) {
            return { state: "invalid", message: "Invalid token amount" };
        }

        await connectDB();

        let payment = await SpoyntPayment.findOne({
            $or: [{ cpi: input.cpi }, { referenceId: input.referenceId }],
        });

        if (!payment) {
            payment = await SpoyntPayment.create({
                ...input,
                creditStatus: "pending",
                creditedAt: null,
                balanceAfter: null,
                lastError: null,
            });
        } else {
            payment.cpi = input.cpi || payment.cpi;
            payment.referenceId = input.referenceId || payment.referenceId;
            payment.userId = input.userId as any;
            payment.tokens = input.tokens;
            payment.requestedCurrency = input.requestedCurrency;
            payment.requestedAmount = input.requestedAmount;
            payment.chargedCurrency = input.chargedCurrency;
            payment.chargedAmount = input.chargedAmount;
            payment.status = input.status;
            payment.resolution = input.resolution;
            payment.providerUpdatedAt = input.providerUpdatedAt;
            payment.lastError = null;
            await payment.save();
        }

        const outcome = normalizeOutcome(input.status, input.resolution);

        if (payment.creditStatus === "credited" && outcome === "credited") {
            return {
                state: "credited",
                tokens: payment.tokens,
                balanceAfter: payment.balanceAfter,
                alreadyCredited: true,
                providerStatus: input.status,
                providerResolution: input.resolution,
            };
        }

        if (outcome === "pending") {
            if (payment.creditStatus !== "pending" && payment.creditStatus !== "credited") {
                payment.creditStatus = "pending";
                await payment.save();
            }

            return {
                state: "pending",
                status: input.status,
                resolution: input.resolution,
                alreadyCredited: payment.creditStatus === "credited",
                providerStatus: input.status,
                providerResolution: input.resolution,
            };
        }

        if (outcome === "failed") {
            if (payment.creditStatus !== "failed" && payment.creditStatus !== "credited") {
                payment.creditStatus = "failed";
                await payment.save();
            }

            return {
                state: "failed",
                status: input.status,
                resolution: input.resolution,
                alreadyCredited: payment.creditStatus === "credited",
                providerStatus: input.status,
                providerResolution: input.resolution,
            };
        }

        const reserved = await SpoyntPayment.findOneAndUpdate(
            {
                _id: payment._id,
                creditStatus: { $nin: ["credited", "crediting"] },
            },
            {
                $set: {
                    creditStatus: "crediting",
                    status: input.status,
                    resolution: input.resolution,
                    providerUpdatedAt: input.providerUpdatedAt,
                    lastError: null,
                },
            },
            { new: true }
        );

        if (!reserved) {
            const fresh = await SpoyntPayment.findById(payment._id).lean();
            if (fresh?.creditStatus === "credited") {
                return {
                    state: "credited",
                    tokens: fresh.tokens,
                    balanceAfter: fresh.balanceAfter,
                    alreadyCredited: true,
                    providerStatus: input.status,
                    providerResolution: input.resolution,
                };
            }

            return {
                state: "pending",
                status: input.status,
                resolution: input.resolution,
                providerStatus: input.status,
                providerResolution: input.resolution,
            };
        }

        try {
            const creditedUser = await userController.topUpWallet(
                input.userId,
                input.tokens / 100,
                {
                    chargedAmount: input.chargedAmount,
                    chargedCurrency: input.chargedCurrency,
                    referenceId: input.referenceId,
                }
            );

            await SpoyntPayment.updateOne(
                { _id: reserved._id },
                {
                    $set: {
                        creditStatus: "credited",
                        creditedAt: new Date(),
                        balanceAfter: creditedUser.tokens ?? null,
                        status: input.status,
                        resolution: input.resolution,
                        providerUpdatedAt: input.providerUpdatedAt,
                        lastError: null,
                    },
                }
            );

            return {
                state: "credited",
                tokens: input.tokens,
                balanceAfter: creditedUser.tokens ?? null,
                alreadyCredited: false,
                providerStatus: input.status,
                providerResolution: input.resolution,
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to credit tokens";

            if (input.referenceId) {
                const existingTx = await transactionService.findByPaymentReference(input.referenceId);
                if (existingTx) {
                    await SpoyntPayment.updateOne(
                        { _id: reserved._id },
                        {
                            $set: {
                                creditStatus: "credited",
                                creditedAt: new Date(),
                                balanceAfter: existingTx.balanceAfter,
                                status: input.status,
                                resolution: input.resolution,
                                providerUpdatedAt: input.providerUpdatedAt,
                                lastError: null,
                            },
                        }
                    );

                    return {
                        state: "credited",
                        tokens: input.tokens,
                        balanceAfter: existingTx.balanceAfter,
                        alreadyCredited: true,
                        providerStatus: input.status,
                        providerResolution: input.resolution,
                    };
                }
            }

            await SpoyntPayment.updateOne(
                { _id: reserved._id },
                {
                    $set: {
                        creditStatus: "pending",
                        lastError: message,
                    },
                }
            );

            return { state: "invalid", message };
        }
    },

    async getCurrentBalance(userId: string) {
        await connectDB();
        const user = await userService.getUserById(userId);
        return user.tokens ?? 0;
    },
};
