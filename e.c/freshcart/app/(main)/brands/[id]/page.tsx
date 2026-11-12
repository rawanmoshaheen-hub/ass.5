import { getBrand, getBrandProducts } from "@/services/brands";
import ProductCard from "@/components/product/ProductCard";

export default async function BrandDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [brand, products] = await Promise.all([
    getBrand(id),
    getBrandProducts(id),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brand.data.image}
          alt={brand.data.name}
          className="w-24 h-24 object-contain bg-white rounded-xl p-2"
        />
        <h1 className="text-2xl font-bold">{brand.data.name}</h1>
      </div>

      {products.data.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No products for this brand.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.data.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}