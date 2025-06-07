import { useEffect, useState } from 'react';
import { getAllProducts ,createProduct} from '../api/products';
import { Product, ProductInput } from '../components/types';

export function useProducts(): { products: Product[]; loading: boolean }{
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then(data => setProducts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};
export function useCreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (product: ProductInput) => {
    try {
      setLoading(true);
      setError(null);
      const created = await createProduct(product);
      return created;
    } catch (err) {
      console.error(err);
      setError('Failed to create product.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}