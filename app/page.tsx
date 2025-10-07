import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Order Management System</h1>
        <p className="text-gray-600 mb-8">Manage your orders efficiently</p>
        <Link href="/orders">
          <Button size="lg">Go to Orders</Button>
        </Link>
      </div>
    </div>
  );
}