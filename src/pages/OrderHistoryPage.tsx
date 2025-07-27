import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { Button } from '../components/common/Button';

const OrderHistoryPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD-123456',
      date: '2023-06-15',
      totalAmount: 45.97,
      status: 'delivered',
      items: [
        { id: '1', name: 'Organic Bananas', quantity: 1, price: 1.99 },
        { id: '5', name: 'Organic Spinach', quantity: 1, price: 2.99 },
        { id: '7', name: 'Atlantic Salmon', quantity: 1, price: 12.99 },
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
      },
    },
    {
      id: 'ORD-123457',
      date: '2023-06-02',
      totalAmount: 32.45,
      status: 'shipped',
      items: [
        { id: '2', name: 'Fresh Avocados', quantity: 2, price: 2.49 },
        { id: '4', name: 'Whole Milk', quantity: 1, price: 3.49 },
        { id: '6', name: 'Sourdough Bread', quantity: 1, price: 4.99 },
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
      },
    },
    {
      id: 'ORD-123458',
      date: '2023-05-20',
      totalAmount: 65.94,
      status: 'processing',
      items: [
        { id: '3', name: 'Chicken Breast', quantity: 2, price: 5.99 },
        { id: '8', name: 'Red Bell Peppers', quantity: 3, price: 1.29 },
        { id: '9', name: 'Organic Eggs', quantity: 1, price: 4.99 },
        { id: '10', name: 'Greek Yogurt', quantity: 2, price: 3.99 },
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
      },
    },
    {
      id: 'ORD-123459',
      date: '2023-05-15',
      totalAmount: 22.97,
      status: 'cancelled',
      items: [
        { id: '11', name: 'Ground Beef', quantity: 1, price: 5.49 },
        { id: '12', name: 'Russet Potatoes', quantity: 1, price: 3.99 },
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
      },
    },
  ];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Package className="text-blue-500\" size={20} />;
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
    ? mockOrders
    : mockOrders.filter(order => order.status === selectedStatus);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/profile" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6">
        <ArrowLeft className="mr-1" size={16} />
        Back to Profile
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 font-display mb-8">Order History</h1>
      
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap gap-2">
          <Button 
            variant={selectedStatus === 'all' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setSelectedStatus('all')}
          >
            All Orders
          </Button>
          <Button 
            variant={selectedStatus === 'processing' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setSelectedStatus('processing')}
          >
            Processing
          </Button>
          <Button 
            variant={selectedStatus === 'shipped' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setSelectedStatus('shipped')}
          >
            Shipped
          </Button>
          <Button 
            variant={selectedStatus === 'delivered' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setSelectedStatus('delivered')}
          >
            Delivered
          </Button>
          <Button 
            variant={selectedStatus === 'cancelled' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setSelectedStatus('cancelled')}
          >
            Cancelled
          </Button>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
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
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">{order.id}</h2>
                    <p className="text-sm text-gray-600">
                      Ordered on {new Date(order.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  <div className="mt-3 sm:mt-0 flex items-center">
                    <div className="flex items-center mr-4">
                      {getStatusIcon(order.status)}
                      <span className="ml-1 text-sm font-medium capitalize">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    
                    <Link to={`/orders/${order.id}`}>
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
                  {order.items.slice(0, 3).map(item => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
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
                    <span className="font-medium text-gray-900">${order.totalAmount.toFixed(2)}</span>
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