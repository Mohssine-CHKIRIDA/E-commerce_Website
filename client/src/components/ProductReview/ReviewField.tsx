import { useState } from "react";
import { Star } from "lucide-react";
import { useReview } from "../../hooks/hookReviews";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ReviewField({ productId }: { productId: number }) {
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newRating, setNewRating] = useState<number>(5);

  const { reviews, loading, addReview } = useReview(productId);

  const handleSubmit = async () => {
    const trimmed = newContent.trim();
    const trimmedTitle = newTitle.trim();

    if (trimmed && trimmedTitle) {
      const newReview = {
        rating: newRating,
        title: trimmedTitle,
        content: trimmed,
        productId,
        userId: 1, // replace later with logged-in userId
      };

      await addReview(newReview);
      setNewTitle("");
      setNewContent("");
      setNewRating(5);
    }
  };

  return (
    <div id="reviews" className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
      {loading && <p className="text-sm text-gray-500">Loading reviews...</p>}
      <div className="mt-6 space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={classNames(
                      review.rating > i ? "text-yellow-500" : "text-gray-200",
                      "h-4 w-4"
                    )}
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="ml-3 text-sm font-medium text-gray-900">
                {review.title}
              </p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <p>{review.user?.name || "Anonymous"}</p>
              <span className="mx-2">&middot;</span>
              <p>
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-600">{review.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-medium text-gray-900">Add a Review</h3>
        <div className="mt-2 flex flex-col space-y-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Review title"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your review..."
            className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          <div className="flex items-center space-x-2">
            <label
              htmlFor="rating"
              className="text-sm font-medium text-gray-700"
            >
              Rating:
            </label>
            <select
              id="rating"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="rounded border border-gray-300 px-2 py-1 text-sm"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
