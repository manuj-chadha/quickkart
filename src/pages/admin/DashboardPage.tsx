import React, { useEffect, useState } from 'react';
import { ShoppingCart, Package, Users, DollarSign } from 'lucide-react';
import { getCategories } from '../../data/categories';
import API from '../../utils/axios';
import { Category, Product } from '../../types';

interface Order {
  _id: string;
  user: {
    name: string;
  };
  orderDate: string;
  finalTotal: number;
  status: string;
}

const DashboardPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [categoryData, productRes, orderStatsRes, recentOrdersRes] = await Promise.all([
          getCategories(),
          API.get('/products'),
          API.get('/orders/admin/stats'),
          API.get('/orders/admin/recent-orders?limit=5'),
        ]);

        setCategories(categoryData);
        setProducts(productRes.data);
        setTotalOrders(orderStatsRes.data.totalOrders);
        setTotalRevenue(orderStatsRes.data.totalRevenue);
        setOrders(recentOrdersRes.data);
      } catch (err) {
        console.error('❌ Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6 text-gray-500">Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Package className="h-6 w-6 text-primary-600" />} bg="bg-primary-100" label="Total Products" value={products.length} />
        <StatCard icon={<ShoppingCart className="h-6 w-6 text-indigo-600" />} bg="bg-indigo-100" label="Total Orders" value={totalOrders} />
        <StatCard icon={<DollarSign className="h-6 w-6 text-green-600" />} bg="bg-green-100" label="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
        <StatCard icon={<Users className="h-6 w-6 text-yellow-600" />} bg="bg-yellow-100" label="Total Categories" value={categories.length} />
      </div>

      {/* Recent Orders */}
      <h2 className="mt-8 text-lg font-medium text-gray-900">Recent Orders</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader title="Order ID" />
              <TableHeader title="Customer" />
              <TableHeader title="Date" />
              <TableHeader title="Total" />
              <TableHeader title="Status" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 text-sm text-gray-900">{order._id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.user?.name || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-gray-800">₹{order.finalTotal.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-sm text-gray-400">
                  No recent orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ icon, bg, label, value }: { icon: JSX.Element; bg: string; label: string; value: string | number }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5 flex items-center">
      <div className={`flex-shrink-0 rounded-md p-3 ${bg}`}>{icon}</div>
      <div className="ml-5 flex-1">
        <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
        <dd className="text-2xl font-semibold text-gray-900">{value}</dd>
      </div>
    </div>
  </div>
);

const TableHeader = ({ title }: { title: string }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</th>
);

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default DashboardPage;
