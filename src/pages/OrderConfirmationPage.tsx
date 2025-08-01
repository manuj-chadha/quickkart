import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import API from '../utils/axios';
import { CheckCircle } from 'lucide-react';

type Order = {
  _id: string;
  status: string;
  productTotal: number;
  discount: number
};

const OrderSuccessPage = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      navigate('/');
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/stripe-session/${sessionId}`);
        setOrder(res.data);
      } catch (err) {
        console.error('Failed to fetch order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId]);

  if (loading) return <div className="p-6 text-center">Verifying your order...</div>;
  if (!order) return <div className="p-6 text-center text-red-600">Order not found or failed.</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-4">
          Thank you for your purchase. We've received your payment and are processing your order.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-bold mb-2">Order Info</h2>
          <p className="text-gray-700 mb-1"><strong>Order ID:</strong> {order._id}</p>
          <p className="text-gray-700 mb-1"><strong>Status:</strong> {order.status}</p>
          <p className="text-gray-700 mb-1"><strong>Total:</strong> ₹{(order.productTotal-order.discount).toFixed(2)}</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/orders')}
            className="w-full md:w-auto bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 transition"
          >
            View Order Status
          </button>

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

export default OrderSuccessPage;
