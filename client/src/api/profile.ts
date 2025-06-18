import { Address, Order, OrderInput, PaymentMethod, Profile } from '../components/types';
import api from './axiosInstance';

export async function getProfile(): Promise<Profile> {
  try {
    const res = await api.get('/auth/profile');
    return res.data;
  } catch (error) {
    console.error('Fetching profile failed:', error);
    throw new Error('Unable to fetch profile');
  }
}

export async function updateProfile(profile: Profile): Promise<Profile> {
  try {
    const res = await api.put('/auth/profile', profile);
    return res.data;
  } catch (error) {
    console.error('Updating profile failed:', error);
    throw new Error('Unable to update profile');
  }
}
export const getAddress = async (): Promise<Address> => {
  const res = await api.get('/addresses/');
  return res.data;
};
export const addAddress = async (address: Omit<Address, 'id'>): Promise<Address> => {
  const res = await api.post('/addresses/', address);
  return res.data;
};

export const deleteAddress = async (addressId: number): Promise<void> => {
  await api.delete(`/addresses/${addressId}`);
};
export const updateAddress = async (
  id: number,
  updatedData: Partial<Address>
): Promise<Address> => {
  const res = await api.put(`/addresses/${id}`, updatedData);
  return res.data;
};

export const getPaymentMethod = async (): Promise<PaymentMethod> => {
  const res = await api.get(`/paymentsMethod/`);
  return res.data;
};
export const addPaymentMethod = async (
  paymentMethod: Omit<PaymentMethod, 'id'>
): Promise<PaymentMethod> => {
  const res = await api.post('/paymentsMethod/', paymentMethod);
  return res.data;
};

export const deletePaymentMethod = async (paymentId: number): Promise<void> => {
  await api.delete(`/paymentsMethod/${paymentId}`);
};

export const updatePaymentMethod = async (
  id: number,
  updatedData: Partial<PaymentMethod>
): Promise<PaymentMethod> => {
  const res = await api.put(`/paymentsMethod/${id}`, updatedData);
  return res.data;
}
export const placeOrder = async (order: OrderInput): Promise<Order> => {
  const res = await api.post('/orders/', order);
  return res.data;
};
// Get all orders for the current user
export const getUserOrders = async (): Promise<Order[]> => {
  const res = await api.get('/orders');
  return res.data;
};

// Get a specific order by ID
export const getOrderById = async (id: number): Promise<Order> => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};