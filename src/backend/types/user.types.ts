import { Document, Types } from "mongoose";

export interface IUserSchema extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    tokens: number;
    role: "user" | "admin";
    phone: string;
    address: {
        street: string;
        city: string;
        country: string;
        postalCode: string;
    };
    dateOfBirth: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserType {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    tokens: number;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}
