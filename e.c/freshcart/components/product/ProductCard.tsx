import Link from "next/link";
import { Product } from "@/types/product";
import Rating from "@/components/ui/Rating";
import AddToCartButton from "@/components/cart/AddToCartButton";
import WishlistButton from "@/components/wishlist/WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col">
      <div className="relative">
        <Link href={`/products/${product._id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-56 object-cover rounded-lg"
          />
        </Link>
        <WishlistButton
          productId={product._id}
          className="absolute top-2 right-2"
        />
      </div>

      <Link href={`/products/${product._id}`}>
        <p className="text-xs text-green-600 mt-2">{product.category?.name}</p>
        <h3 className="font-semibold line-clamp-1">{product.title}</h3>
      </Link>

      <div className="flex justify-between items-center mt-2">
        <div>
          {product.priceAfterDiscount ? (
            <>
              <span className="font-bold text-green-600">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="ml-2 text-sm text-gray-400 line-through">
                {product.price}
              </span>
            </>
          ) : (
            <span className="font-bold">{product.price} EGP</span>
          )}
        </div>
        <Rating value={product.ratingsAverage} />
      </div>

      <AddToCartButton productId={product._id} className="mt-3" />
    </div>
  );
}