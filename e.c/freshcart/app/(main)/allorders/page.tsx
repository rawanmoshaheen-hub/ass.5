"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { getUserOrders } from "@/services/orders";
import { Order } from "@/types/order";

export default function OrdersPage() {
  const { userId } = useAuth();
  const { refresh } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // بعد الدفع Online بيرجع المستخدم هنا، فنحدّث الـ Cart
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!userId) return;
    getUserOrders(userId)
      .then((data) =>
        setOrders(
          [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        )
      )
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">You have no orders yet.</p>
        <Link href="/products" className="bg-green-600 text-white px-6 py-2 rounded-lg">
          Start shopping
        </Link>
      </div>
    );
  }

  const badge = (ok: boolean, yes: string, no: string) => (
    <span
      className={`text-xs px-2 py-1 rounded-full ${
        ok ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {ok ? yes : no}
    </span>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex flex-wrap justify-between gap-2 mb-3">
              <div>
                <p className="font-semibold">Order #{o.id ?? o._id.slice(-6)}</p>
                <p className="text-xs text-gray-500">
                  {new Date(o.createdAt).toLocaleDateString()} ·{" "}
                  {o.paymentMethodType === "cash" ? "Cash" : "Card"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {badge(o.isPaid, "Paid", "Not paid")}
                {badge(o.isDelivered, "Delivered", "In progress")}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto mb-3">
              {o.cartItems.map((item) => (
                <div key={item._id} className="shrink-0 text-center w-20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <p className="text-xs mt-1">× {item.count}</p>
                </div>
              ))}
            </div>

            {o.shippingAddress && (
              <p className="text-sm text-gray-500 mb-2">
                {o.shippingAddress.details}, {o.shippingAddress.city} ·{" "}
                {o.shippingAddress.phone}
              </p>
            )}

            <p className="font-bold text-right">{o.totalOrderPrice} EGP</p>
          </div>
        ))}
      </div>
    </div>
  );
}