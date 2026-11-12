import { getProduct } from "@/services/products";
import ProductGallery from "@/components/product/ProductGallery";
import Rating from "@/components/ui/Rating";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: p } = await getProduct(id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <ProductGallery cover={p.imageCover} images={p.images} />

      <div>
        <p className="text-green-600 text-sm">
          {p.category?.name} · {p.brand?.name}
        </p>
        <h1 className="text-2xl font-bold my-2">{p.title}</h1>
        <p className="text-gray-600 mb-4">{p.description}</p>

        <div className="flex items-center gap-3 mb-4">
          <Rating value={p.ratingsAverage} />
          <span className="text-sm text-gray-500">
            ({p.ratingsQuantity} reviews)
          </span>
        </div>

        <p className="text-2xl font-bold mb-4">
          {p.priceAfterDiscount ?? p.price} EGP
          {p.priceAfterDiscount && (
            <span className="ml-3 text-base text-gray-400 line-through">
              {p.price}
            </span>
          )}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          In stock: {p.quantity}
        </p>

        {/* زراير Add to Cart و Wishlist هتتضاف بعد ما نعمل الـ Contexts */}
      </div>
    </div>
  );
}