import api from "@/lib/api";
import { Order, ShippingAddress } from "@/types/order";

export const createCashOrder = async (
  cartId: string,
  shippingAddress: ShippingAddress
) => (await api.post(`/orders/${cartId}`, { shippingAddress })).data;

export const createCheckoutSession = async (
  cartId: string,
  shippingAddress: ShippingAddress
) =>
  (
    await api.post<{ status: string; session: { url: string } }>(
      `/orders/checkout-session/${cartId}`,
      { shippingAddress },
      { params: { url: window.location.origin } }
    )
  ).data;

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const res = await api.get(`/orders/user/${userId}`);
  return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
};