import express from "express";
import * as reviewController from "../controllers/review.controller";

const router = express.Router();

router.post("/", reviewController.postReview);
router.get("/:productId", reviewController.getReviewsByProductId);

export default router;
