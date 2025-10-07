import { useState, useEffect, useCallback } from 'react';
import { ordersApi, Order } from '@/lib/api';

export function useOrders(page: number, search: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ordersApi.getOrders(page, 10, search);
      setOrders(data.data);
      setTotalPages(data.meta.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, totalPages, loading, error, refetch: fetchOrders };
}