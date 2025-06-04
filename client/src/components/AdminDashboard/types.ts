export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  shippingAddress: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  lastOrder: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  price: number;
  InStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
  sizes?: (string | number)[];
  colors?: ProductColor[];
}
export type ProductColor = {
  id:number,
  name: string;
  hex:string;
};
export interface SalesData {
  month: string;
  sales: number;
  orders: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}
export type TabType =
  | "overview"
  | "orders"
  | "customers"
  | "products-list"
  | "products-create"
  | "products-edit";
