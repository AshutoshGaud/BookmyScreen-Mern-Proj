import express from "express";
import * as AuthController from "./auth.controller";
import { isVerfiedUser } from "../../middlewares/auth_middleware";

const router = express.Router();

router.post("/send-otp", AuthController.sendOtp);

router.post("/verify-otp", (req, res, next) => {
  AuthController.verifyOTP(req, res, next);
});

router.post("/logout", isVerfiedUser, AuthController.logout);

export default router;