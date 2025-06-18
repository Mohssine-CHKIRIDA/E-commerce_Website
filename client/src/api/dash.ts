import { Order } from '../components/types';
import api from './axiosInstance'; // ton axios configuré avec intercepteurs

export const getAllOrders = async () => {
  const res = await api.get('/orders/all');
  return res.data;
};


export const placeOrder = async (orderData: Order): Promise<Order> => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const updateOrder = async (idOrder: number, updateData: Partial<Order>) => {
  const res = await api.put(`/orders/${idOrder}`, updateData);
  return res.data;
};

export const getOrder = async (idOrder: number) => {
  const res = await api.get(`/orders/${idOrder}`);
  return res.data;
};
export const deleteOrder = async (idOrder: number) => {
  const res = await api.delete(`/orders/${idOrder}`);
  return res.data;
};
