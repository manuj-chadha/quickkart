import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { CreditCard, ShieldCheck, ArrowLeft } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { cart, getTotal, clearCart } = useCart();
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
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Basic validation
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
    
    // Payment validation
    if (!formData.cardName) errors.cardName = 'Name on card is required';
    if (!formData.cardNumber) {
      errors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = 'Card number is invalid';
    }
    if (!formData.expDate) {
      errors.expDate = 'Expiration date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expDate)) {
      errors.expDate = 'Expiration date is invalid (MM/YY)';
    }
    if (!formData.cvv) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = 'CVV is invalid';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process order
      clearCart();
      navigate('/order-confirmation');
    }
  };
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const subtotal = getTotal();
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/cart')}
        className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6"
      >
        <ArrowLeft className="mr-1" size={16} />
        Back to Cart
      </button>
      
      <h1 className="text-3xl font-bold text-gray-900 font-display mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors.city && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.city}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${formErrors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {formErrors.state && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.state}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {formErrors.zipCode && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
                <div className="flex items-center">
                  <CreditCard className="text-gray-400 mr-2" size={20} />
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${formErrors.cardName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors.cardName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.cardName}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className={`w-full px-4 py-2 rounded-lg border ${formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors.cardNumber && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.cardNumber}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                  <input
                    type="text"
                    id="expDate"
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={`w-full px-4 py-2 rounded-lg border ${formErrors.expDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors.expDate && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.expDate}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="XXX"
                    className={`w-full px-4 py-2 rounded-lg border ${formErrors.cvv ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {formErrors.cvv && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.cvv}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                <ShieldCheck className="text-green-500 mr-2" size={20} />
                <p className="text-sm text-gray-600">Your payment information is encrypted and secure.</p>
              </div>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="max-h-64 overflow-y-auto mb-6">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => {
                  const displayPrice = item.product.discount 
                    ? item.product.price * (1 - item.product.discount / 100) 
                    : item.product.price;
                  
                  return (
                    <li key={item.product.id} className="py-3 flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className="text-sm">{item.product.name}</h3>
                            <p className="ml-4">${(displayPrice * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full mt-6"
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;