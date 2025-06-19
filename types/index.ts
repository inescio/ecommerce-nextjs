export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: number;
  rating: number;
  reviews?: number;
  image: string;
  images?: string[];
  featured?: boolean;
  description: string;
  specifications?: Record<string, string>;
  stock?: number;
  brand: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  addresses?: Address[];
}

export interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  zipCode: string;
  default?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipping' | 'delivered';
  total: number;
  items: CartItem[];
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed' | 'shipping';
  minPurchase: number;
}