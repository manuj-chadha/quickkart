import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/common/Button';

const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 font-display mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-4">
          Thank you for your order. We've received your payment and will start preparing your items for delivery.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Order Information</h2>
          <p className="text-gray-600 mb-2">Order Number: <span className="font-medium">{orderNumber}</span></p>
          <p className="text-gray-600">A confirmation email has been sent to your email address.</p>
        </div>
        
        <div className="space-y-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full md:w-auto"
            onClick={() => navigate('/orders')}
          >
            View Order Status
          </Button>
          
          <Link 
            to="/" 
            className="block text-primary-600 hover:text-primary-800 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;