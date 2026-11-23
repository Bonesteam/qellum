import mongoose, { Document, Schema, Model } from "mongoose";

export type PaymentCreditStatus = "pending" | "crediting" | "credited" | "failed";

export interface PaymentDocument extends Document {
    cpi: string;
    referenceId: string;
    userId: mongoose.Types.ObjectId;
    tokens: number;
    requestedCurrency: "GBP" | "EUR" | "USD";
    requestedAmount: number;
    chargedCurrency: "GBP" | "EUR" | "USD";
    chargedAmount: number;
    status: string;
    resolution: string | null;
    providerUpdatedAt: number | null;
    creditStatus: PaymentCreditStatus;
    creditedAt: Date | null;
    balanceAfter: number | null;
    lastError: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const paymentSchema = new Schema<PaymentDocument>(
    {
        cpi: { type: String, required: true, unique: true, index: true },
        referenceId: { type: String, required: true, unique: true, index: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        tokens: { type: Number, required: true },
        requestedCurrency: { type: String, enum: ["GBP", "EUR", "USD"], required: true },
        requestedAmount: { type: Number, required: true },
        chargedCurrency: { type: String, enum: ["GBP", "EUR", "USD"], required: true },
        chargedAmount: { type: Number, required: true },
        status: { type: String, required: true, default: "created" },
        resolution: { type: String, default: null },
        providerUpdatedAt: { type: Number, default: null },
        creditStatus: {
            type: String,
            enum: ["pending", "crediting", "credited", "failed"],
            default: "pending",
            index: true,
        },
        creditedAt: { type: Date, default: null },
        balanceAfter: { type: Number, default: null },
        lastError: { type: String, default: null },
    },
    { timestamps: true }
);

export const Payment: Model<PaymentDocument> =
    mongoose.models.Payment ||
    mongoose.models.SpoyntPayment ||
    mongoose.models.CorefyPayment ||
    mongoose.model<PaymentDocument>("Payment", paymentSchema, "spoyntpayments");

export const CorefyPayment = Payment;
export const SpoyntPayment = Payment;
export type SpoyntCreditStatus = PaymentCreditStatus;
export type SpoyntPaymentDocument = PaymentDocument;
export type CorefyPaymentDocument = PaymentDocument;
