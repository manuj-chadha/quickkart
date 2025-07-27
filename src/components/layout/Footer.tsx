import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ShoppingCart className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold text-white font-display">QuickKart</span>
            </Link>
            <p className="mb-4">
              QuickKart is your trusted grocery delivery platform for fresh produce, 
              everyday essentials, and specialty items delivered right to your doorstep.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-primary-400 transition">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-primary-400 transition">Categories</Link></li>
              <li><Link to="/deals" className="hover:text-primary-400 transition">Deals & Offers</Link></li>
              <li><Link to="/products/fresh" className="hover:text-primary-400 transition">Fresh Produce</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:text-primary-400 transition">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-primary-400 transition">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-400 transition">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-primary-400 transition">Returns & Refunds</Link></li>
            </ul>
          </div>

          {/* Account & Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Account</h3>
            <ul className="space-y-2">
              <li><Link to="/account" className="hover:text-primary-400 transition">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-primary-400 transition">My Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary-400 transition">Wishlist</Link></li>
              <li><Link to="/account/settings" className="hover:text-primary-400 transition">Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} QuickKart. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <Link to="/privacy" className="hover:text-primary-400 transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary-400 transition">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-primary-400 transition">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}