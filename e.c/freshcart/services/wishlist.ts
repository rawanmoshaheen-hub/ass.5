import api from "@/lib/api";
import { Product } from "@/types/product";

export const getWishlist = async () =>
  (await api.get<{ count: number; data: Product[] }>("/wishlist")).data;

export const addToWishlist = async (productId: string) =>
  (await api.post("/wishlist", { productId })).data;

export const removeFromWishlist = async (productId: string) =>
  (await api.delete(`/wishlist/${productId}`)).data;