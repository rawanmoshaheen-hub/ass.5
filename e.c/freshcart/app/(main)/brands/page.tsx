import Link from "next/link";
import { getBrands } from "@/services/brands";

export default async function BrandsPage() {
  const { data } = await getBrands();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Brands</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map((b) => (
          <Link
            key={b._id}
            href={`/brands/${b._id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.image}
              alt={b.name}
              className="w-full h-24 object-contain"
            />
            <p className="mt-2 text-sm font-semibold">{b.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}