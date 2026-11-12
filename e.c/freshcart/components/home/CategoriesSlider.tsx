import Link from "next/link";
import { Category } from "@/types/product";
import SectionTitle from "@/components/ui/SectionTitle";

export default function CategoriesSlider({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section>
      <SectionTitle title="Shop by Category" href="/categories" />
      <div className="flex gap-4 overflow-x-auto pb-2">
        {categories.map((c) => (
          <Link
            key={c._id}
            href={`/categories/${c._id}`}
            className="shrink-0 w-36 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.image}
              alt={c.name}
              className="w-36 h-36 object-cover rounded-full border-2 border-green-100 hover:border-green-500 transition"
            />
            <p className="mt-2 text-sm font-medium">{c.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}