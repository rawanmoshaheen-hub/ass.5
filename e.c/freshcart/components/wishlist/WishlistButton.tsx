"use client";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistButton({
  productId,
  className = "",
}: {
  productId: string;
  className?: string;
}) {
  const { isInWishlist, toggle } = useWishlist();
  const active = isInWishlist(productId);

  return (
    <button
      onClick={() => toggle(productId)}
      aria-label="Toggle wishlist"
      className={`bg-white/90 rounded-full w-9 h-9 flex items-center justify-center text-xl shadow ${className}`}
    >
      <span className={active ? "text-red-500" : "text-gray-400"}>
        {active ? "♥" : "♡"}
      </span>
    </button>
  );
}