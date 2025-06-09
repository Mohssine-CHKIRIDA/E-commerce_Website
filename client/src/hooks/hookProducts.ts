import { useEffect, useState } from 'react';
import { getAllProducts ,createProduct, searchProducts, getProductById} from '../api/products';
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
export function useProduct(productId: number): { product: Product | undefined; loading: boolean } {
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (productId == null) return;

    setLoading(true);
    getProductById(productId)
      .then(data => setProduct(data))
      .catch(err => {
        console.error(err);
        setProduct(undefined);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading };
}
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
export function useSearchProducts(query: string): { products: Product[]; loading: boolean; error: string | null } {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    searchProducts(query)
      .then(data => setProducts(data))
      .catch(err => {
        console.error(err);
        setError('Failed to search products.');
      })
      .finally(() => setLoading(false));
  }, [query]);

  return { products, loading, error };
}