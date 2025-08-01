import { loadStripe } from '@stripe/stripe-js';
import API from '../../utils/axios';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export const StripeCheckoutButton = ({
  formData,
  validateForm,
}: {
  formData: any;
  validateForm: () => boolean;
}) => {
  const { cart } = useCart();
  const navigate = useNavigate();
  console.log(formData);
  

  const handleCheckout = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    const deliveryAddress = {
      contactName: formData.contactName,
      contactPhone: formData.contactPhone,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      addressType: 'Home',
    };

    try {
      const stripe = await stripePromise;

      const response = await API.post('/payment/create-stripe-session', {
        cartItems: cart,
        deliveryAddress,
        paymentMethod: 'Credit/Debit Card',
      });

      const sessionId = response.data.sessionId;
      const result = await stripe?.redirectToCheckout({ sessionId });

      if (result?.error) {
        console.error('Stripe redirect error:', result.error.message);
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      navigate('/cart');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Pay with Stripe
    </button>
  );
};
