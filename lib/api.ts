const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Order {
  id: number;
  userId: number;
  status: string;
  total: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateOrderPayload {
  userId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}

export interface OrdersResponse {
  data: Order[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// API Functions
export const ordersApi = {
  async getOrders(page: number = 1, limit: number = 10, search: string = ''): Promise<OrdersResponse> {
    const response = await fetch(
      `${API_URL}/orders?page=${page}&limit=${limit}&search=${search}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    return response.json();
  },

  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    return response.json();
  },

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/orders`);
    const data = await response.json();
    
    // Extract unique users from orders
    const uniqueUsers = Array.from(
      new Map(data.data.map((order: Order) => [order.user.email, order.user])).values()
    ) as User[];
    
    return uniqueUsers;
  },

  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/orders?limit=100`);
    const data = await response.json();
    
    // Extract unique products from orders
    const productMap = new Map<string, Product>();
    data.data.forEach((order: Order) => {
      order.orderItems.forEach((item) => {
        if (!productMap.has(item.product.name)) {
          productMap.set(item.product.name, {
            id: item.product.id,
            name: item.product.name,
            price: item.price,
          });
        }
      });
    });
    
    return Array.from(productMap.values());
  },
};