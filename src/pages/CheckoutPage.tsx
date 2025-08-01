import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft } from 'lucide-react';
import { StripeCheckoutButton } from '../components/common/StripeCheckoutButton';

const CheckoutPage: React.FC = () => {
  const { cart, getTotal } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone) errors.phone = 'Phone is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zipCode) errors.zipCode = 'ZIP code is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const subtotal = getTotal();
  const shipping = subtotal >= 50 ? 0 : 30;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const deliveryAddress = {
    contactName: `${formData.firstName} ${formData.lastName}`,
    contactPhone: formData.phone,
    street: formData.address,
    city: formData.city,
    state: formData.state,
    pincode: formData.zipCode,
    addressType: 'Home',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/cart')}
        className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6"
      >
        <ArrowLeft className="mr-1" size={16} />
        Back to Cart
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'firstName', label: 'First Name' },
                { id: 'lastName', label: 'Last Name' },
                { id: 'email', label: 'Email Address', type: 'email' },
                { id: 'phone', label: 'Phone Number', type: 'tel' },
                { id: 'address', label: 'Address', full: true },
                { id: 'city', label: 'City' },
                { id: 'state', label: 'State' },
                { id: 'zipCode', label: 'ZIP Code' },
              ].map(({ id, label, type = 'text', full }) => (
                <div className={full ? 'md:col-span-2' : ''} key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors[id] ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors[id] && (
                    <p className="mt-1 text-sm text-red-500">{formErrors[id]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto mb-6">
              {cart.map(item => (
                <li key={item.product._id} className="py-3 flex">
                  <div className="h-16 w-16 overflow-hidden rounded border border-gray-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-sm">₹{(item.product.priceMRP * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Stripe Payment Trigger */}
            <StripeCheckoutButton
              formData={deliveryAddress}
              validateForm={validateForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
