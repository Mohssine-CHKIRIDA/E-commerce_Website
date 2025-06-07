import { useEffect, useState } from 'react';
import { getAllCategories, getCategoryById} from '../api/categories';
import { Category} from '../components/types';

export function useCategories(): { categories: Category[]; loading: boolean }{
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories()
      .then(data => setCategories(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
};

export function useCategory(id: number) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategoryById(id)
      .then((data) => setCategory(data))
      .catch((err) => console.error('Error fetching category:', err))
      .finally(() => setLoading(false));
  }, [id]);

  return { category, loading };
}
