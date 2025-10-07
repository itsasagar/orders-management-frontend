'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Pagination } from '@/components/orders/Pagination';
import { useOrders } from '@/lib/hooks/useOrders';
import { SearchBar } from '@/components/orders/searchbar';
import { CreateOrderDialog } from '@/components/orders/CreateOrderDialogue';
import { OrdersTable } from '@/components/orders/orderTable';

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { orders, totalPages, loading, refetch } = useOrders(page, search);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page on search
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Orders Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <SearchBar value={search} onChange={handleSearchChange} />
            <CreateOrderDialog onSuccess={refetch} />
          </div>

          <OrdersTable orders={orders} loading={loading} />

          {!loading && orders.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}