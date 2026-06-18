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
            await user.save();
        }

        return balanceGBP;
    },

    async addBalanceGBP(userId: string, amountGBP: number) {
        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");

        const next = round2(resolveBalanceGBP(user) + amountGBP);
        user.balanceGBP = next;
        user.tokens = syncLegacyTokens(next);
        await user.save();
        return user;
    },

    async spendBalanceGBP(userId: string, amountGBP: number) {
        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");

        const current = resolveBalanceGBP(user);
        if (current < amountGBP) throw new Error("Insufficient balance");

        const next = round2(current - amountGBP);
        user.balanceGBP = next;
        user.tokens = syncLegacyTokens(next);
        await user.save();
        return user;
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
