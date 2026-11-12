export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  quantity: number;
  sold?: number;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}

export interface ProductsResponse {
  results: number;
  metadata: Metadata;
  data: Product[];
}

export interface ProductResponse {
  data: Product;
}