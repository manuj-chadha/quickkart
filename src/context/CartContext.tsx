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
  mergeGuestCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const isAuthenticated = () => !!localStorage.getItem('token');

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getGuestCart = (): CartItem[] =>
    JSON.parse(localStorage.getItem('guestCart') || '[]');

  const saveGuestCart = (cart: CartItem[]) =>
    localStorage.setItem('guestCart', JSON.stringify(cart));

  const clearGuestCart = () => localStorage.removeItem('guestCart');

  const fetchCart = async () => {
    if (isAuthenticated()) {
      try {
        const res = await API.get('/cart');
        setCart(res.data.items || []);
      } catch (err) {
        console.error('❌ Failed to fetch cart:', err);
      }
    } else {
      setCart(getGuestCart());
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: Product, quantity = 1) => {
    if (isAuthenticated()) {
      try {
        await API.post('/cart', { productId: product._id, quantity });
        await fetchCart();
      } catch (err) {
        console.error('❌ Failed to add to cart:', err);
      }
    } else {
      const guestCart = getGuestCart();
      const existing = guestCart.find(item => item.product._id === product._id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        guestCart.push({ product, quantity });
      }
      saveGuestCart(guestCart);
      setCart(guestCart);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (isAuthenticated()) {
      try {
        await API.delete(`/cart/${productId}`);
        await fetchCart();
      } catch (err) {
        console.error('❌ Failed to remove from cart:', err);
      }
    } else {
      const updatedCart = getGuestCart().filter(item => item.product._id !== productId);
      saveGuestCart(updatedCart);
      setCart(updatedCart);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
      return;
    }

    if (isAuthenticated()) {
      const existing = cart.find(item => item.product._id === productId);
      if (!existing) return;
      const diff = newQuantity - existing.quantity;
      if (diff === 0) return;

      try {
        await API.post('/cart', { productId, quantity: diff });
        await fetchCart();
      } catch (err) {
        console.error('❌ Failed to update quantity:', err);
      }
    } else {
      const guestCart = getGuestCart();
      const index = guestCart.findIndex(item => item.product._id === productId);
      if (index === -1) return;

      guestCart[index].quantity = newQuantity;
      saveGuestCart(guestCart);
      setCart(guestCart);
    }
  };

  const clearCart = async () => {
    if (isAuthenticated()) {
      try {
        await Promise.all(cart.map(item => API.delete(`/cart/${item.product._id}`)));
        await fetchCart();
      } catch (err) {
        console.error('❌ Failed to clear cart:', err);
      }
    } else {
      clearGuestCart();
      setCart([]);
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const { priceMRP, discountPrice = 0 } = item.product;
      const effectivePrice = priceMRP - (priceMRP * discountPrice) / 100;
      return total + effectivePrice * item.quantity;
    }, 0);
  };

  const getItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const mergeGuestCart = async () => {
    if (!isAuthenticated()) return;

    const guestCart = getGuestCart();
    if (guestCart.length === 0) return;

    try {
      await API.post('/cart/merge', {
        items: guestCart.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      });
      clearGuestCart();
      await fetchCart();
    } catch (err) {
      console.error('❌ Failed to merge guest cart:', err);
    }
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
        mergeGuestCart,
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
