import { Product, ProductInput, Review } from '../components/types';
import api from './axiosInstance';

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await api.get('/products/');
  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (product: ProductInput): Promise<Product> => {
  const res = await api.post('/products', product);
  return res.data;
};
export const searchProducts = async (query: string): Promise<Product[]> => {
  const res = await api.get('/products/search', {
    params: { q: query },
  });
  return res.data;
};

export async function postReview(review: Review): Promise<any> {
  const response = await api.post("/reviews", review);
  return response.data;
}

export async function getReviewsByProductId(productId: number): Promise<Review[]> {
  const response = await api.get(`/reviews/${productId}`);
  return response.data;
}
