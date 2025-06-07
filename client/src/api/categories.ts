import api from './axiosInstance'; // ton axios configuré avec intercepteurs

export const getAllCategories = async () => {
  const res = await api.get('/categories/');
  return res.data;
};
export const getAllSubcategories = async () => {
  const res = await api.get('/subcategories/');
  return res.data;
};
export const getAllBrands = async () => {
  const res = await api.get('/brands/');
  return res.data;
};
export const getCategoryById = async (id: number) => {
  const res = await api.get(`/categories/${id}`);
  return res.data;
};

