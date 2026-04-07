import mongoose from "mongoose";

export interface IOtPatload {
    email: string;
    code: string;
};

export interface IRefreshTokenPayload {
    token:string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
};

export interface ITokenPayload {
    _id : string;
    email : string;
    phone? : string;
    role? : string;
}