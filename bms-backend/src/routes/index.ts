import express from "express";
import movieRouter from "../modules/movie/movie.route";
import theaterRouter from "../modules/theater/theater.routes";
import showRouter from "../show/show.routes";

const router = express.Router();

router.use("/movies", movieRouter);
router.use("/theaters", theaterRouter);
router.use("/shows", showRouter);

export default router;
