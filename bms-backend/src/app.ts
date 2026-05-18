import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes";
import { globalErrorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

// 🔥 MUST BE FIRST (IMPORTANT FIX)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// 🔥 BODY + COOKIE PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🔥 ROUTES
app.use("/api/v1", router);

// Home route
app.get("/", (_, res) => {
  res.json({
    message: "Welcome to BookMyScreen API",
  });
});

// Global error handler (LAST)
app.use(globalErrorHandler);

export default app;