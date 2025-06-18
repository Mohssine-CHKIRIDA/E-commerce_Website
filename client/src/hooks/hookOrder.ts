// hooks/useOrders.ts
import { useEffect, useState } from 'react';
import { getAllOrders, getOrder, placeOrder, updateOrder } from '../api/dash';
import { Order} from '../components/types'; // ✅ Assure-toi que ce chemin est correct selon ton projet

// 🔁 Récupérer toutes les commandes
export function useOrders(): {
  orders: Order[];
  loading: boolean;
  error: string | null;
} {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
}

// 🔁 Récupérer une commande spécifique
export function useOrder(orderId: number): {
  order: Order | null;
  loading: boolean;
  error: string | null;
} {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const data = await getOrder(orderId);
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch order.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { order, loading, error };
}

// 📦 Passer une commande (si `placeOrder` attend un OrderInput, il faudra adapter la fonction)
export function usePlaceOrder(): {
  place: (orderData: Order) => Promise<Order>;
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const place = async (orderData: Order) => {
    try {
      setLoading(true);
      setError(null);
      const created = await placeOrder(orderData);
      return created;
    } catch (err) {
      console.error(err);
      setError("Failed to place order.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { place, loading, error };
}
// 🛠️ Mettre à jour une commande
export function useUpdateOrder(): {
  update: (id: number, updateData: Partial<Order>) => Promise<Order>;
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: number, updateData: Partial<Order>) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await updateOrder(id, updateData);
      return updated;
    } catch (err) {
      console.error(err);
      setError('Failed to update order.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}
import { deleteOrder as deleteOrderApi } from "../api/dash"; // adapte le chemin si nécessaire

export function useDeleteOrder(): {
  remove: (id: number) => Promise<boolean>;
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteOrderApi(id);
      return true;
    } catch (err) {
      console.error(err);
      setError("Failed to delete order.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
