export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  seller: {
    address: string;
    name: string;
    rating: number;
  };
  category: string;
  tags: string[];
  stock: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  address: string;
  name: string;
  bio: string;
  avatar: string;
  rating: number;
  isSeller: boolean;
  products?: Product[];
  purchases?: Order[];
}

export interface Order {
  id: string;
  buyer: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  txHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  reviewer: string;
  rating: number;
  comment: string;
  createdAt: string;
}