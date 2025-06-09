// src/controllers/review.controller.ts
import { Request, Response } from "express";
import * as reviewService from "../services/review.service";

export const postReview = async (req: Request, res: Response) => {
  try {
    const { productId, userId, rating, title, content } = req.body;

    if (!productId || !userId || !rating || !title || !content) {
       res.status(400).json({ message: "Missing required fields" });
    }

    const review = await reviewService.createReview({
      productId,
      userId,
      rating,
      title,
      content,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReviewsByProductId = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId);

    if (isNaN(productId)) {
       res.status(400).json({ message: "Invalid productId" });
    }

    const reviews = await reviewService.getReviewsByProductId(productId);

    res.json(reviews);
  } catch (err) {
    console.error("Error getting reviews:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
