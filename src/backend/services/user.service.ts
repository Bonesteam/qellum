import { User } from "../models/user.model";
import { resolveBalanceGBP, round2, syncLegacyTokens } from "@/utils/wallet";
import { getTestAccountBalanceGBP, getTestAccountEmail, isTestMode } from "@/backend/config/features";

export const userService = {
    async ensureWalletSynced(user: InstanceType<typeof User>) {
        let balanceGBP = resolveBalanceGBP(user);

        if (isTestMode() && user.email?.toLowerCase() === getTestAccountEmail()) {
            balanceGBP = getTestAccountBalanceGBP();
        }

        const tokens = syncLegacyTokens(balanceGBP);
        if (user.balanceGBP !== balanceGBP || user.tokens !== tokens) {
            user.balanceGBP = balanceGBP;
            user.tokens = tokens;
            // Atomic update to avoid full-document validation, which would throw
            // for legacy users missing now-required profile fields.
            await User.updateOne({ _id: user._id }, { $set: { balanceGBP, tokens } });
        }

        return balanceGBP;
    },

    async addBalanceGBP(userId: string, amountGBP: number) {
        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");

        const next = round2(resolveBalanceGBP(user) + amountGBP);
        const updated = await User.findByIdAndUpdate(
            userId,
            { $set: { balanceGBP: next, tokens: syncLegacyTokens(next) } },
            { new: true }
        );
        if (!updated) throw new Error("UserNotFound");
        return updated;
    },

    async spendBalanceGBP(userId: string, amountGBP: number) {
        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");

        const current = resolveBalanceGBP(user);
        if (current < amountGBP) throw new Error("Insufficient balance");

        const next = round2(current - amountGBP);
        const updated = await User.findByIdAndUpdate(
            userId,
            { $set: { balanceGBP: next, tokens: syncLegacyTokens(next) } },
            { new: true }
        );
        if (!updated) throw new Error("UserNotFound");
        return updated;
    },

    /** @deprecated Use addBalanceGBP — kept for transitional callers (amount in legacy tokens). */
    async addTokens(userId: string, amount: number) {
        return userService.addBalanceGBP(userId, round2(amount / 100));
    },

    async getUserById(userId: string) {
        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");
        await userService.ensureWalletSynced(user);
        return user;
    },
};
