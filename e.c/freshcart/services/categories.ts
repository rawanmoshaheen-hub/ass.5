import { getData } from "@/lib/server-api";
import { Category, Product } from "@/types/product";

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export function getCategories() {
  return getData<{ data: Category[] }>("/categories");
}

export function getCategory(id: string) {
  return getData<{ data: Category }>(`/categories/${id}`);
}

export function getSubCategories(categoryId: string) {
  return getData<{ data: SubCategory[] }>(
    `/categories/${categoryId}/subcategories`
  );
}

export function getCategoryProducts(categoryId: string) {
  return getData<{ data: Product[] }>(
    `/products?category[in]=${categoryId}&limit=40`
  );
}