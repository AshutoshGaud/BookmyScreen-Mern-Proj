import { Router } from "express";
import * as ShowController from "./show.controller";

const router = Router();

// Create a new show
router.post("/", ShowController.createShow);

// Get shows by movie + date + location
router.get("/", ShowController.getShowsByMovieDateLocation);

// Get single show by ID
router.get("/:id", ShowController.getShowById);

// Update seat status
router.put("/:showId", ShowController.updateSeatStatus);

export default router;