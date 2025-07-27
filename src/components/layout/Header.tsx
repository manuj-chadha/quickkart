import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn } from '../../utils/cn';

export function Header() {
  const { getItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-primary-700 font-display">QuickKart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-12">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-primary-600 transition">Shop</Link>
            <Link to="/categories" className="text-gray-600 hover:text-primary-600 transition">Categories</Link>
            <Link to="/deals" className="text-gray-600 hover:text-primary-600 transition">Deals</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-600 transition">About</Link>
          </nav>

          {/* Search bar */}
          <div className="hidden md:flex relative flex-1 mx-8">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button className="absolute right-3 top-2 text-gray-400 hover:text-primary-600">
              <Search size={20} />
            </button>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-primary-600 transition">
              <User size={24} />
            </Link>
            
            <Link to="/cart" className="relative text-gray-600 hover:text-primary-600 transition">
              <ShoppingCart size={24} />
              {getItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemsCount()}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 hover:text-primary-600 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button className="absolute right-3 top-2 text-gray-400 hover:text-primary-600">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col p-4 space-y-4">
          <Link 
            to="/" 
            className="text-lg text-gray-600 hover:text-primary-600 transition py-2 border-b border-gray-100"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-lg text-gray-600 hover:text-primary-600 transition py-2 border-b border-gray-100"
            onClick={toggleMenu}
          >
            Shop
          </Link>
          <Link 
            to="/categories" 
            className="text-lg text-gray-600 hover:text-primary-600 transition py-2 border-b border-gray-100"
            onClick={toggleMenu}
          >
            Categories
          </Link>
          <Link 
            to="/deals" 
            className="text-lg text-gray-600 hover:text-primary-600 transition py-2 border-b border-gray-100"
            onClick={toggleMenu}
          >
            Deals
          </Link>
          <Link 
            to="/about" 
            className="text-lg text-gray-600 hover:text-primary-600 transition py-2 border-b border-gray-100"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link 
            to="/login" 
            className="text-lg text-gray-600 hover:text-primary-600 transition py-2 border-b border-gray-100"
            onClick={toggleMenu}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}