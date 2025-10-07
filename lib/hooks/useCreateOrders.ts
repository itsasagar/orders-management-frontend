import { useState } from 'react';
import { ordersApi, CreateOrderPayload } from '@/lib/api';

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (payload: CreateOrderPayload) => {
    setLoading(true);
    setError(null);

    try {
      await ordersApi.createOrder(payload);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create order';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
}