"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CartProduct } from "@/types/cart";

export default function CartItem({ item }: { item: CartProduct }) {
  const { updateCount, removeItem } = useCart();
  const id = item.product.id;

  return (
    <div className="bg-white rounded-xl shadow-sm p-3 flex gap-4 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.product.imageCover}
        alt={item.product.title}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <Link href={`/products/${id}`} className="font-semibold line-clamp-1 hover:text-green-600">
          {item.product.title}
        </Link>
        <p className="text-sm text-gray-500">{item.price} EGP each</p>
        <button
          onClick={() => removeItem(id)}
          className="text-sm text-red-500 hover:underline mt-1"
        >
          Remove
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateCount(id, item.count - 1)}
          className="w-8 h-8 border rounded hover:bg-gray-100"
        >
          −
        </button>
        <span className="w-6 text-center">{item.count}</span>
        <button
          onClick={() => updateCount(id, item.count + 1)}
          className="w-8 h-8 border rounded hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <p className="w-24 text-right font-bold">{item.price * item.count} EGP</p>
    </div>
  );
}