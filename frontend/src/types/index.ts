export interface Product {
  id: string;
  name: string;
  destination: string;
  mood: string;
  scents: string[];
  price: number;
  inStock: boolean;
  tag: string;
  image?: string;
}

export interface CartItem {
  qty: number;
}

export type Cart = Record<string, CartItem>;
export type Wishlist = string[];

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export type ReviewStore = Record<string, Review[]>;

export interface Order {
  orderNum: string;
  items: { id: string; qty: number }[];
  subtotal: number;
  fulfillment: "pickup" | "shipping";
  address: string;
  notes: string;
  name: string;
  email: string;
}
