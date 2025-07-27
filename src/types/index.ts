export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  inStock: boolean;
  unit: string;
  rating: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
}