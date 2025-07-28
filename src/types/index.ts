// export interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   discount?: number;
//   inStock: boolean;
//   unit: string;
//   rating: number;
//   featured?: boolean;
// }
export interface Product {
  _id: string;
  name: string;
  description: string;
  priceMRP: number;
  discountPrice: number;
  images: string[];
  stockCount: number;
  isActive: boolean;
  rating: 4,
  category: {
    _id: string;
    name: string;
    // optionally add displayOrder, subcategories, etc. if needed
  };
  subcategory: string;
  weightUnit: {
    value: number;
    unit: string;
    _id: string;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  featured: boolean;
}


export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  addresses: Address[];
}

export interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
}