import mongoose, { Schema } from "mongoose";
import { IRefreshTokenPayload } from "./auth.interface";

const refreshTokenSchema = new Schema<IRefreshTokenPayload>(
  {
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const RefreshTokenModel = mongoose.model<IRefreshTokenPayload>(
  "RefreshToken",
  refreshTokenSchema
);