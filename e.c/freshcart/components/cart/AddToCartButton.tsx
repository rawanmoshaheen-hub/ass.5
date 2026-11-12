"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({
  productId,
  className = "",
}: {
  productId: string;
  className?: string;
}) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    await addToCart(productId);
    setLoading(false);
  };

  return (
    <button
      onClick={handle}
      disabled={loading}
      className={`w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60 ${className}`}
    >
      {loading ? "Adding..." : "Add to cart"}
    </button>
  );
}