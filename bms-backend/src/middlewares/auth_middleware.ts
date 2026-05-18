import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import * as TokenService from "../modules/auth/token.service";
import * as UserService from "../modules/user/user.service";
import { JwtPayload } from "jsonwebtoken";

// Extend express Request interface to include user property
declare global {
    namespace Express {
        interface Request{
            user? : any;
        }
    }
}

interface TokenPayload extends JwtPayload{
    id: string;
}

export const isVerfiedUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    console.log("🔥 COOKIE DEBUG:", req.cookies); // 👈 ADD THIS

    const token = req.cookies?.accessToken;

    console.log("🔥 TOKEN DEBUG:", token); // 👈 ADD THIS

    if (!token) {
      return next(createHttpError(401, "Access token is missing"));
    }

    const decodedToken = TokenService.verifyAccessToken(token) as any;

    console.log("🔥 DECODED TOKEN:", decodedToken); // 👈 ADD THIS

    const user = await UserService.getUserById(decodedToken._id);

    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("❌ AUTH ERROR:", error); // 👈 ADD THIS
    return next(createHttpError(401, "Invalid or expired token"));
  }
};