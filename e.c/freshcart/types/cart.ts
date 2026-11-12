export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: {
    id: string;
    title: string;
    imageCover: string;
    category?: { name: string };
    brand?: { name: string };
    ratingsAverage?: number;
  };
}

export interface Cart {
  _id: string;
  totalCartPrice: number;
  products: CartProduct[];
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId?: string;
  data: Cart;
}