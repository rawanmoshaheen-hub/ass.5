import {
  getCategory,
  getSubCategories,
  getCategoryProducts,
} from "@/services/categories";
import ProductCard from "@/components/product/ProductCard";

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [category, subs, products] = await Promise.all([
    getCategory(id),
    getSubCategories(id),
    getCategoryProducts(id),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{category.data.name}</h1>

      {subs.data.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold mb-2">Subcategories</h2>
          <div className="flex flex-wrap gap-2">
            {subs.data.map((s) => (
              <span
                key={s._id}
                className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {products.data.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No products in this category.
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