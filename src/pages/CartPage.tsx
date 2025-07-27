import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getTotal, getItemsCount } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 font-display mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <ShoppingCart size={64} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/products" 
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md inline-block transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Cart Items ({getItemsCount()})</h2>
              </div>
              
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => {
                  const displayPrice = item.product.discount 
                    ? item.product.price * (1 - item.product.discount / 100) 
                    : item.product.price;
                  const itemTotal = displayPrice * item.quantity;
                  
                  return (
                    <li key={item.product.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 sm:ml-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                <Link to={`/product/${item.product.id}`} className="hover:text-primary-600">
                                  {item.product.name}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-500 mt-1 capitalize">{item.product.category}</p>
                              
                              <div className="mt-1">
                                {item.product.discount ? (
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-900">${displayPrice.toFixed(2)}</span>
                                    <span className="text-xs text-gray-500 line-through ml-2">${item.product.price.toFixed(2)}</span>
                                  </div>
                                ) : (
                                  <span className="text-sm font-medium text-gray-900">${item.product.price.toFixed(2)}</span>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-0">
                              <div className="flex items-center">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                  <button 
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    className="px-2 py-1 text-gray-600 hover:text-primary-600"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus size={16} />
                                  </button>
                                  <span className="px-3 py-1 text-gray-700">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    className="px-2 py-1 text-gray-600 hover:text-primary-600"
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                                
                                <button 
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="ml-4 text-gray-400 hover:text-red-500"
                                  aria-label="Remove item"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </div>
                              
                              <div className="mt-2 text-right">
                                <span className="text-sm font-medium text-gray-900">
                                  Total: ${itemTotal.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {getTotal() >= 50 ? 'Free' : '$4.99'}
                  </span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${(getTotal() >= 50 ? getTotal() : getTotal() + 4.99).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {getTotal() >= 50 
                      ? 'Free shipping applied' 
                      : `Add $${(50 - getTotal()).toFixed(2)} more for free shipping`}
                  </p>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full mt-6 flex items-center justify-center"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2" size={16} />
              </Button>
              
              <Link 
                to="/products" 
                className="text-primary-600 hover:text-primary-800 font-medium text-center block mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;