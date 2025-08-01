import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { Button } from '../components/common/Button';
import API from '../utils/axios';

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/my-orders');
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Package className="text-blue-500" size={20} />;
      case 'shipped':
        return <Truck className="text-orange-500" size={20} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled':
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/profile" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6">
        <ArrowLeft className="mr-1" size={16} />
        Back to Profile
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 font-display mb-8">Order History</h1>

      <div className="mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap gap-2">
          {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Package size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-600 mb-6">You don't have any orders with this status.</p>
          <Link to="/products">
            <Button variant="primary">Shop Now</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">{order._id}</h2>
                    <p className="text-sm text-gray-600">
                      Ordered on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-0 flex items-center">
                    <div className="flex items-center mr-4">
                      {getStatusIcon(order.status)}
                      <span className="ml-1 text-sm font-medium capitalize">
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <Link to={`/orders/${order._id}`}>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Eye size={16} className="mr-1" />
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Order Items</h3>

                <div className="space-y-4">
                  {order.items.slice(0, 3).map((item: any) => (
                    <div key={item._id} className="flex justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm text-gray-800">
                        ₹{(item.priceAtOrder * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  {order.items.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{order.items.length - 3} more item(s)
                    </p>
                  )}

                  <div className="pt-4 border-t border-gray-200 flex justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-medium text-gray-900">₹{(order.productTotal-order.discount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
