import api from "@/lib/api";
import { CartResponse } from "@/types/cart";

export const getCart = async () =>
  (await api.get<CartResponse>("/cart")).data;

export const addToCart = async (productId: string) =>
  (await api.post("/cart", { productId })).data;

export const updateCartItem = async (productId: string, count: number) =>
  (await api.put(`/cart/${productId}`, { count })).data;

export const removeCartItem = async (productId: string) =>
  (await api.delete(`/cart/${productId}`)).data;

export const clearCart = async () => (await api.delete("/cart")).data;