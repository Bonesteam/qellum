import { connectDB } from "../config/db";
import { authService } from "../services/auth.service";
import { User } from "../models/user.model";
import { AuthResponse, AuthError, LogoutResponse } from "@/backend/types/auth.types";
import { UserType } from "@/backend/types/user.types";
import { signAccessToken } from "../utils/jwt";

export const authController = {
    async register(body: { firstName: string; lastName: string; email: string; password: string; phone: string; address: { street: string; city: string; country: string; postalCode: string }; dateOfBirth: string }) {
        await connectDB();
        const { user, accessToken, refreshToken } = await authService.register(body);
        return { user: toUser(user), tokens: { accessToken, refreshToken } };
    },

    async login(body: { email: string; password: string }, userAgent?: string, ip?: string) {
        await connectDB();
        const { user, accessToken, refreshToken } = await authService.login(body.email, body.password, userAgent, ip);
        return { user: toUser(user), tokens: { accessToken, refreshToken } };
    },

    async refresh(refreshJWT: string, userAgent?: string, ip?: string) {
        await connectDB();
        const { user, accessToken, refreshToken } = await authService.refresh(refreshJWT, userAgent, ip);
        return { user: toUser(user), tokens: { accessToken, refreshToken } };
    },

    async me(userId: string): Promise<UserType> {
        await connectDB();
        const user = await authService.me(userId);
        return toUser(user);
    },

    async logout(refreshJWT: string): Promise<LogoutResponse> {
        await connectDB();
        await authService.logout(refreshJWT);
        return { message: "Logged out successfully" };
    },

    async logoutAll(userId: string): Promise<LogoutResponse> {
        await connectDB();
        await authService.logoutAll(userId);
        return { message: "All sessions revoked" };
    },
};

function toUser(u: any): UserType {
    return {
        _id: u._id.toString(),
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        role: u.role,
        tokens: u.tokens,
        // keep created/updated mapping
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
    };
}
