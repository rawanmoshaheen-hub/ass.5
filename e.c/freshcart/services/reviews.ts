import api from "@/lib/api";

export interface Review {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user: { _id: string; name: string };
}

export const getReviews = async (productId: string): Promise<Review[]> =>
  (await api.get<{ data: Review[] }>(`/products/${productId}/reviews`)).data
    .data;

export const addReview = async (
  productId: string,
  data: { review: string; rating: number }
) => (await api.post(`/products/${productId}/reviews`, data)).data;

export const deleteReview = async (reviewId: string) =>
  (await api.delete(`/reviews/${reviewId}`)).data;