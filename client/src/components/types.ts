export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}
export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: Order;
  total: number;
  items: number;
  shippingAddress: string;
}

export interface User {
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
export interface Brand{
    id:number;
    name:string;
}
export interface Category{
   id: number;
   name: string;
   imageUrl: string;
   subcategories?:Subcategory[];
   brands?:Brand[];
}
export interface Subcategory{
   id: number;
   name: string;
   category?:Category
}
export interface Product {
  id: number;
  name: string;
  category: Category;
  subcategory: Subcategory;
  imageUrl: string;
  price: number;
  inStock: number;
  brand: Brand;
  rating: number;
  numReviews: number;
  Reviews:Review[]
  description: string;
  productSizes?: ProductSize[];
  productColors?: ProductColor[];
}
export interface Review {
  id?: number;
  productId: number;
  userId: number;
  rating: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    name: string;
  };
}
export type Color = {
  id:number,
  name: string;
  hex:string;
};
export interface ProductColor {
  productId: number;
  colorId: number;
  color: Color;
}
export type Size = {
  id:number;
  value: number|string;
};
export interface ProductSize {
  productId: number;
  sizeId: number;
  size: Size;
}
export interface CartItem {
  id: number;
  cartItemId: number; // Server-side cart item ID
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  inStock: number;
  colorId?: number | null;
  sizeId?: number | null;
  color?: {
    id: number;
    name: string;
    hex: string;
  };
  size?: {
    id: number;
    value: string;
  };
}


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

export interface ProductInput{
  name: string,
  description: string,
  price: number,
  imageUrl:string,
  rating: number,
  inStock: number,
  categoryId: number,
  subcategoryId: number,
  brandName: string;  
  colors: { name: string; hex: string }[];
  sizes: (number | string)[];
};
export interface ProductEdit {
  id: number;
  name: string;
  category: Category;
  subcategory: Subcategory;
  brand: Brand;
  imageUrl: string;
  price: number;
  inStock: number;

  rating: number;
  numReviews: number;
  description: string;
  sizes?: Size[];
  colors?: Color[];
}
function isCompleteProductEdit(product: Partial<ProductEdit>): product is ProductEdit {
  return (
    typeof product.name === "string" &&
    typeof product.description === "string" &&
    typeof product.price === "number" &&
    typeof product.imageUrl === "string" &&
    typeof product.rating === "number" &&
    typeof product.inStock === "number" &&
    typeof product.category === "object" && typeof product.category.id === "number" &&
    typeof product.subcategory === "object" && typeof product.subcategory.id === "number" &&
    // Accept brand with either id or at least a name string
    typeof product.brand === "object" &&
    (
      (typeof product.brand.id === "number") ||
      (typeof product.brand.name === "string" && !product.brand.id)
    )
  );
}

export async function convertToProductInput(product: Partial<ProductEdit>): Promise<ProductInput> {
  if (!isCompleteProductEdit(product)) {
    throw new Error("Le produit est incomplet et ne peut pas être converti.");
  }

  return {
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    rating: product.rating,
    inStock: product.inStock,
    categoryId: product.category.id,
    subcategoryId: product.subcategory.id,
    brandName: product.brand.name,

    colors: (product.colors || []).map((color) => ({
      name: color.name,
      hex: color.hex,
    })),

    sizes: (product.sizes || []).map((size) => {
      if (typeof size === "number") {
        return size;
      } else if (typeof size === "string") {
        return size.trim();
      } else if (typeof size === "object" && size !== null && "value" in size) {
        if (typeof size.value === "string") {
          return size.value.trim();
        } else {
          return size.value;
        }
      } else {
        return size;
      }
    }),
  };
}


