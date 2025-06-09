import { useEffect, useState } from "react";
import { getReviewsByProductId, postReview } from "../api/products";
import { Review } from "../components/types";

export function useReview(productId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsByProductId(productId);
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setError("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (review: Omit<Review, "id" | "createdAt" | "updatedAt" | "user">) => {
    try {
      const savedReview = await postReview(review);
      setReviews((prev) => [savedReview, ...prev]);
    } catch (err) {
      console.error("Failed to post review:", err);
      setError("Failed to post review");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return { reviews, loading, error, addReview, refreshReviews: fetchReviews };
}
