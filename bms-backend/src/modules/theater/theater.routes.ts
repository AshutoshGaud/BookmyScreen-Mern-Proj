import express from "express";
import * as TheaterController from "./theater.controller";

// ⬇️ ADD THESE TWO IMPORTANT IMPORTS
import { validate } from "../../middlewares/validate";   // correct path
import { TheaterSchema } from "./theater.validation";           // correct path

const router = express.Router();

router.post("/", validate(TheaterSchema), TheaterController.createTheater);
router.get("/", TheaterController.getTheaters);

export default router;
