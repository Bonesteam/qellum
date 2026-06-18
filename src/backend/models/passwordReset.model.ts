import mongoose, { Document, Schema } from "mongoose";

export interface PasswordResetDocument extends Document {
    userId: mongoose.Types.ObjectId;
    tokenHash: string;
    expiresAt: Date;
    usedAt: Date | null;
    createdAt: Date;
}

const passwordResetSchema = new Schema<PasswordResetDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        tokenHash: { type: String, required: true, unique: true, index: true },
        expiresAt: { type: Date, required: true, index: true },
        usedAt: { type: Date, default: null },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const PasswordReset =
    mongoose.models.PasswordReset ||
    mongoose.model<PasswordResetDocument>("PasswordReset", passwordResetSchema);
