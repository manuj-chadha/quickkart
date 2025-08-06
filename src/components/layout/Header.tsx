import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn } from '../../utils/cn';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/products' },
  { label: 'Categories', path: '/categories' },
  { label: 'Deals', path: '/deals' },
  { label: 'About', path: '/about' },
];

export function Header() {
  const { getItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      setIsMenuOpen(false);
      setSearchQuery("");
    }
  };

  const renderNavLinks = (isMobile = false) =>
    NAV_LINKS.map(({ label, path }) => (
      <Link
        key={label}
        to={path}
        className={cn(
          isMobile
            ? 'text-lg text-gray-600 hover:text-primary-600 transition py-2 border-b border-gray-100'
            : 'text-gray-600 hover:text-primary-600 transition'
        )}
        onClick={isMobile ? toggleMenu : undefined}
      >
        {label}
      </Link>
    ));

  const SearchInput = (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
      <button type="submit" className="absolute right-3 top-2 text-gray-400 hover:text-primary-600">
        <Search size={20} />
      </button>
    </form>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-primary-700 font-display">QuickKart</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 ml-12">
            {renderNavLinks()}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-8">{SearchInput}</div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-gray-600 hover:text-primary-600 transition">
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

            <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-primary-600 transition">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3">{SearchInput}</div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-gray-600">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          {renderNavLinks(true)}
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
