import Link from "next/link";
import { Brand } from "@/types/product";
import SectionTitle from "@/components/ui/SectionTitle";

export default function BrandsSlider({ brands }: { brands: Brand[] }) {
  return (
    <section>
      <SectionTitle title="Top Brands" href="/brands" />
      <div className="flex gap-4 overflow-x-auto pb-2">
        {brands.map((b) => (
          <Link
            key={b._id}
            href={`/brands/${b._id}`}
            className="shrink-0 w-32 bg-white rounded-xl shadow-sm hover:shadow-md p-3 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.image}
              alt={b.name}
              className="w-full h-16 object-contain"
            />
            <p className="mt-2 text-xs font-medium">{b.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}