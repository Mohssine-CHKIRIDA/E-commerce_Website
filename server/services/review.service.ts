// src/services/review.service.ts
import prisma from "../prisma/client";
import { Review } from "@prisma/client";

export const createReview = async (data: {
  productId: number;
  userId: number;
  rating: number;
  title: string;
  content: string;
}): Promise<Review> => {
  const review = await prisma.review.create({
    data: {
      productId: data.productId,
      userId: data.userId,
      rating: data.rating,
      title: data.title,
      content: data.content,
      date: new Date(), // set automatically
    },
  });

  // Optional: Update product's rating and numReviews
  const reviews = await prisma.review.findMany({
    where: { productId: data.productId },
  });

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await prisma.product.update({
    where: { id: data.productId },
    data: {
      rating: avgRating,
      numReviews: reviews.length,
    },
  });

  return review;
};

export const getReviewsByProductId = async (
  productId: number
): Promise<Review[]> => {
  return await prisma.review.findMany({
    where: { productId },
    include: {
      user: true, // to get username / email
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
