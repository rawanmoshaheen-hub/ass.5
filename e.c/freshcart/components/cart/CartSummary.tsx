"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const { cart, count, clear } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 h-fit">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2 text-sm">
        <span>Items</span>
        <span>{count}</span>
      </div>
      <div className="flex justify-between mb-4 font-bold text-lg">
        <span>Total</span>
        <span>{cart?.totalCartPrice ?? 0} EGP</span>
      </div>
      <Link
        href="/checkout"
        className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Proceed to checkout
      </Link>
      <button
        onClick={clear}
        className="w-full mt-3 border border-red-300 text-red-500 py-2 rounded-lg hover:bg-red-50"
      >
        Clear cart
      </button>
    </div>
  );
}