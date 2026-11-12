"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const { cart, loading } = useCart();

  if (loading && !cart) {
    return <p className="text-center py-20 text-gray-500">Loading cart...</p>;
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link href="/products" className="bg-green-600 text-white px-6 py-2 rounded-lg">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {cart.products.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  );
}