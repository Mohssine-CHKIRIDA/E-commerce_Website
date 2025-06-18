import { User } from '../components/types';
import api from './axiosInstance'; // ton axios configuré avec intercepteurs

export const getAllCustomers = async (): Promise<User[]> => {
  const res = await api.get('/customers');
  return res.data;
};