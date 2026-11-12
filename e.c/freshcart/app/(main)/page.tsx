import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";
import { getBrands } from "@/services/brands";
import HeroSlider from "@/components/home/HeroSlider";
import CategoriesSlider from "@/components/home/CategoriesSlider";
import BrandsSlider from "@/components/home/BrandsSlider";
import Newsletter from "@/components/home/Newsletter";
import ProductCard from "@/components/product/ProductCard";
import SectionTitle from "@/components/ui/SectionTitle";

export default async function Home() {
  const [products, categories, brands] = await Promise.all([
    getProducts({ limit: 8, sort: "-ratingsAverage" }),
    getCategories(),
    getBrands(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      <HeroSlider />
      <CategoriesSlider categories={categories.data} />

      <section>
        <SectionTitle title="Featured Products" href="/products" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.data.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      <BrandsSlider brands={brands.data} />
      <Newsletter />
    </div>
  );
}