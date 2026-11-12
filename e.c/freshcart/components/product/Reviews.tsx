"use client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { addReview, deleteReview, getReviews, Review } from "@/services/reviews";
import { getError } from "@/lib/getError";

export default function Reviews({ productId }: { productId: string }) {
  const { token, userId } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    try {
      setReviews(await getReviews(productId));
    } catch {
      setReviews([]);
    }
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    try {
      await addReview(productId, { review: text, rating });
      toast.success("Review added");
      setText("");
      setRating(5);
      await load();
    } catch (err) {
      toast.error(getError(err, "Could not add review"));
    } finally {
      setSending(false);
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteReview(id);
      setReviews((p) => p.filter((r) => r._id !== id));
      toast.success("Review deleted");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pb-10">
      <h2 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h2>

      {token ? (
        <form onSubmit={submit} className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your review..."
            rows={3}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 mb-3"
          />
          <div className="flex items-center justify-between">
            <label className="text-sm flex items-center gap-2">
              Rating
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} ★
                  </option>
                ))}
              </select>
            </label>
            <button
              disabled={sending}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-gray-500 mb-6">Login to write a review.</p>
      )}

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r._id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between">
                <p className="font-semibold">{r.user?.name}</p>
                <span className="text-yellow-500 text-sm">★ {r.rating}</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{r.review}</p>
              {userId && r.user?._id === userId && (
                <button
                  onClick={() => remove(r._id)}
                  className="text-xs text-red-500 mt-2 hover:underline"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}