import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Order } from '@/lib/api';
  
  interface OrdersTableProps {
    orders: Order[];
    loading: boolean;
  }
  
  export function OrdersTable({ orders, loading }: OrdersTableProps) {
    if (loading) {
      return <div className="text-center py-8">Loading...</div>;
    }
  
    if (orders.length === 0) {
      return <div className="text-center py-8 text-gray-500">No orders found</div>;
    }
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{order.user.name}</div>
                  <div className="text-sm text-gray-500">{order.user.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell className="font-semibold">
                ${order.total.toFixed(2)}
              </TableCell>
              <TableCell>
                <OrderItemsList items={order.orderItems} />
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  
  function StatusBadge({ status }: { status: string }) {
    const isConfirmed = status === 'confirmed';
    
    return (
      <span
        className={`px-2 py-1 rounded text-sm font-medium ${
          isConfirmed
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {status}
      </span>
    );
  }
  
  function OrderItemsList({ items }: { items: Order['orderItems'] }) {
    return (
      <div className="space-y-1">
        {items.map((item, idx) => (
          <div key={idx} className="text-sm">
            {item.product.name} × {item.quantity}
          </div>
        ))}
      </div>
    );
  }
  