"use client";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { items, loading } = useWishlist();

  if (loading && items.length === 0) {
    return <p className="text-center py-20 text-gray-500">Loading wishlist...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
        <Link href="/products" className="bg-green-600 text-white px-6 py-2 rounded-lg">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}