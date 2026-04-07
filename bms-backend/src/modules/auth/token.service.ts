import jwt, { JwtPayload } from "jsonwebtoken";
import { ITokenPayload } from "./auth.interface";
import { RefreshTokenModel } from "./refresh.model";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

// generate tokens
export const generateToken = (
  payload: ITokenPayload
): { accessToken: string; refreshToken: string } => {
  
  if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error("JWT secrets are not defined");
  }

  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// store refresh token in DB
export const storeRefreshToken = async (
  userId: string,
  refreshToken: string
): Promise<void> => {
  await RefreshTokenModel.create({ userId, token: refreshToken });
};

// verify access token
export const verifyAccessToken = (
  token: string
): ITokenPayload | JwtPayload => {
  return jwt.verify(token, ACCESS_SECRET) as ITokenPayload | JwtPayload;
};

// verify refresh token
export const verifyRefreshToken = (
  token: string
): ITokenPayload | JwtPayload => {
  return jwt.verify(token, REFRESH_SECRET) as ITokenPayload | JwtPayload;
};

// find refresh token
export const findRefreshToken = async (
  userId: string,
  token: string
): Promise<{ userId: string; token: string } | null> => {
  return await RefreshTokenModel.findOne({ userId, token });
};

// delete refresh token
export const deleteRefreshToken = async (
  token: string
): Promise<{ userId: string; token: string } | null> => {
  return await RefreshTokenModel.findOneAndDelete({ token });
};

// update refresh token
export const updateRefreshToken = async (
  userId: string,
  newToken: string
): Promise<void> => {
  await RefreshTokenModel.updateOne(
    { userId },
    { token: newToken },
    { upsert: true }
  );
};