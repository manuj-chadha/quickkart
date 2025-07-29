import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, Users, BarChart2, Tag, LogOut, Menu, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="flex items-center space-x-2 px-4 mb-6">
          <ShoppingCart className="h-8 w-8 text-primary-400" />
          <span className="text-2xl font-bold">QuickKart <span className="text-primary-400">Admin</span></span>
        </div>

        <nav>
          <Link to="/admin/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
            <div className="flex items-center space-x-2">
              <BarChart2 size={20} />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link to="/admin/products" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
            <div className="flex items-center space-x-2">
              <Package size={20} />
              <span>Products</span>
            </div>
          </Link>
          <Link to="/admin/categories" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
            <div className="flex items-center space-x-2">
              <Tag size={20} />
              <span>Categories</span>
            </div>
          </Link>
          <Link to="/admin/orders" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
            <div className="flex items-center space-x-2">
              <ShoppingCart size={20} />
              <span>Orders</span>
            </div>
          </Link>
          <Link to="/admin/customers" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
            <div className="flex items-center space-x-2">
              <Users size={20} />
              <span>Customers</span>
            </div>
          </Link>
        </nav>

        <div className="px-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white text-left"
          >
            <div className="flex items-center space-x-2">
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <button onClick={toggleSidebar} className="md:hidden">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center space-x-4">
            <span className="font-medium">{admin?.name}</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}