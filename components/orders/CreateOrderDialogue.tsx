'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCreateOrder } from '@/lib/hooks/useCreateOrders';


interface OrderItemInput {
  productId: string;
  quantity: string;
}

interface CreateOrderDialogProps {
  onSuccess: () => void;
}

export function CreateOrderDialog({ onSuccess }: CreateOrderDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItemInput[]>([
    { productId: '', quantity: '1' },
  ]);

  const { createOrder, loading, error } = useCreateOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const items = orderItems
      .filter((item) => item.productId && item.quantity)
      .map((item) => ({
        productId: parseInt(item.productId),
        quantity: parseInt(item.quantity),
      }));

    if (!userId || items.length === 0) {
      alert('Please enter user ID and add at least one product');
      return;
    }

    const success = await createOrder({
      userId: parseInt(userId),
      items,
    });

    if (success) {
      alert('Order created successfully!');
      resetForm();
      setIsOpen(false);
      onSuccess();
    } else if (error) {
      alert(`Error: ${error}`);
    }
  };

  const resetForm = () => {
    setUserId('');
    setOrderItems([{ productId: '', quantity: '1' }]);
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { productId: '', quantity: '1' }]);
  };

  const removeOrderItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateOrderItem = (index: number, field: keyof OrderItemInput, value: string) => {
    const newItems = [...orderItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setOrderItems(newItems);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              User ID
            </label>
            <Input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID (e.g., 1 or 2)"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Use ID 1 for John Doe or ID 2 for Jane Smith
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Order Items
            </label>
            {orderItems.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  type="number"
                  placeholder="Product ID (1, 2, or 3)"
                  value={item.productId}
                  onChange={(e) =>
                    updateOrderItem(index, 'productId', e.target.value)
                  }
                  required
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    updateOrderItem(index, 'quantity', e.target.value)
                  }
                  min="1"
                  required
                  className="w-32"
                />
                {orderItems.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeOrderItem(index)}
                    size="icon"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addOrderItem}
              className="w-full"
            >
              + Add Item
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Order'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}