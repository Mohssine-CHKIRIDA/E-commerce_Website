export interface Profile {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
}

export interface Address {
  id: number;
  type: string;
  name: string;
  address: string;
  city: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: number;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled';
  total: string;
  items: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export type SectionType = 'profile' | 'orders' | 'addresses' | 'payments' | 'wishlist' | 'notifications' | 'rewards' | 'security' | 'settings';