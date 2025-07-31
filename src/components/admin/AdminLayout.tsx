import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, Users, BarChart2, Tag, LogOut, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setUser } from '../../redux/authSlice';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const admin = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}
      >
        <div className="flex items-center space-x-2 px-4 mb-6">
          <ShoppingCart className="h-8 w-8 text-primary-400" />
          <span className="text-2xl font-bold">
            QuickKart <span className="text-primary-400">Admin</span>
          </span>
        </div>

        <nav>
          <SidebarLink to="/admin/dashboard" icon={<BarChart2 size={20} />} label="Dashboard" />
          <SidebarLink to="/admin/products" icon={<Package size={20} />} label="Products" />
          <SidebarLink to="/admin/categories" icon={<Tag size={20} />} label="Categories" />
          <SidebarLink to="/admin/orders" icon={<ShoppingCart size={20} />} label="Orders" />
          <SidebarLink to="/admin/customers" icon={<Users size={20} />} label="Customers" />
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
            <span className="font-medium">{admin?.name ?? 'Admin'}</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

const SidebarLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <Link
    to={to}
    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white"
  >
    <div className="flex items-center space-x-2">
      {icon}
      <span>{label}</span>
    </div>
  </Link>
);
