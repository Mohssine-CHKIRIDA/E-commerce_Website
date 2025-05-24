import { useState } from "react";
import { Reviews } from "./Reviews";
import { Star } from "lucide-react";
function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
interface Review {
  productId: number;
  rating: number;
  title: string;
  author: string;
  date: string;
  content: string;
}
export default function ReviewField() {
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newRating, setNewRating] = useState<number>(5);
  const productReviews: Review[] = Reviews.filter(
    (review) => review.productId === 1
  );
  const [comments, setComments] = useState<Review[]>(productReviews || []);
  return (
    <div id="reviews" className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
      <div className="mt-6 space-y-8">
        {comments.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-6">
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
              <p>{review.author}</p>
              <span className="mx-2">&middot;</span>
              <p>{review.date}</p>
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
            onClick={() => {
              const trimmed = newContent.trim();
              const trimmedTitle = newTitle.trim();

              if (trimmed && trimmedTitle) {
                const newReview: Review = {
                  rating: newRating,
                  title: trimmedTitle,
                  author: "Anonymous", // ou récupère l'utilisateur connecté
                  date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                  content: trimmed,
                  productId: 4, // ou une variable product.id si dynamique
                };

                setComments((prev) => [...prev, newReview]);
                setNewTitle("");
                setNewContent("");
                setNewRating(5);
              }
            }}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
