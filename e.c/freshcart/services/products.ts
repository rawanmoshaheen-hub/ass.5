import { getData } from "@/lib/server-api";
import { ProductResponse, ProductsResponse } from "@/types/product";

export interface ProductsParams {
  page?: number;
  limit?: number;
  keyword?: string;
  sort?: string;
  category?: string;
  brand?: string;
}

export function getProducts(params: ProductsParams = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") q.set(k, String(v));
  });
  return getData<ProductsResponse>(`/products?${q.toString()}`);
}

export function getProduct(id: string) {
  return getData<ProductResponse>(`/products/${id}`);
}