export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Address extends ShippingAddress {
  _id: string;
  name: string;
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: {
    _id?: string;
    id?: string;
    title: string;
    imageCover: string;
  };
}

export interface Order {
  _id: string;
  id?: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  shippingAddress?: ShippingAddress;
  cartItems: OrderItem[];
}