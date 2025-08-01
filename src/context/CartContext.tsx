import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import API from '../utils/axios';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, newQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotal: () => number;
  getItemsCount: () => number;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const res = await API.get('/cart');
      setCart(res.data.items || []);
    } catch (err) {
      console.error('❌ Failed to fetch cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: Product, quantity = 1) => {
    try {
      await API.post('/cart', { productId: product._id, quantity });
      await fetchCart();
    } catch (err) {
      console.error('❌ Failed to add to cart:', err);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await API.delete(`/cart/${productId}`);
      await fetchCart();
    } catch (err) {
      console.error('❌ Failed to remove from cart:', err);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      const existing = cart.find(item => item.product._id === productId);
      if (!existing) return;

      const diff = newQuantity - existing.quantity;
      if (diff === 0) return;

      if (newQuantity < 1) {
        await removeFromCart(productId);
      } else {
        await API.post('/cart', { productId, quantity: diff });
        await fetchCart();
      }
    } catch (err) {
      console.error('❌ Failed to update quantity:', err);
    }
  };

  const clearCart = async () => {
    try {
      // Until there's a clear route, remove items one-by-one
      await Promise.all(cart.map(item => API.delete(`/cart/${item.product._id}`)));
      await fetchCart();
    } catch (err) {
      console.error('❌ Failed to clear cart:', err);
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const discount = item.product.discountPrice || 0;
      const effectivePrice = item.product.priceMRP - (item.product.priceMRP * discount / 100);
      return total + effectivePrice * item.quantity;
    }, 0);
  };


  const getItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemsCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
