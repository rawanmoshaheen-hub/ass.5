import { getData } from "@/lib/server-api";
import { Brand, Product } from "@/types/product";

export function getBrands() {
  return getData<{ data: Brand[] }>("/brands?limit=40");
}

export function getBrand(id: string) {
  return getData<{ data: Brand }>(`/brands/${id}`);
}

export function getBrandProducts(brandId: string) {
  return getData<{ data: Product[] }>(`/products?brand=${brandId}&limit=40`);
}