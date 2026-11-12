import Link from "next/link";
import { getCategories } from "@/services/categories";

export default async function CategoriesPage() {
  const { data } = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((c) => (
          <Link
            key={c._id}
            href={`/categories/${c._id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.image}
              alt={c.name}
              className="w-full h-56 object-cover"
            />
            <p className="text-center font-semibold py-3 text-green-600">
              {c.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}