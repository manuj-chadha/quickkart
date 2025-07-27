import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Settings, Package, LogOut } from 'lucide-react';
import { Button } from '../components/common/Button';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const mockUser = {
    id: 'usr123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    addresses: [
      {
        id: 'addr1',
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        isDefault: true,
      },
      {
        id: 'addr2',
        street: '456 Market St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        isDefault: false,
      },
    ],
  };
  
  const tabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
                    <User className="text-gray-400 mr-2" size={18} />
                    <span className="text-gray-800">{mockUser.name}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
                    <Mail className="text-gray-400 mr-2" size={18} />
                    <span className="text-gray-800">{mockUser.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
                    <Phone className="text-gray-400 mr-2" size={18} />
                    <span className="text-gray-800">{mockUser.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <Button variant="outline" size="md">Edit Profile</Button>
              </div>
            </div>
            
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Addresses</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockUser.addresses.map(address => (
                  <div 
                    key={address.id} 
                    className={`border ${address.isDefault ? 'border-primary-300 bg-primary-50' : 'border-gray-200'} rounded-lg p-4 relative`}
                  >
                    {address.isDefault && (
                      <span className="absolute top-2 right-2 bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                    
                    <div className="flex items-start mb-3">
                      <MapPin className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <div>
                        <p className="text-gray-800">{address.street}</p>
                        <p className="text-gray-600">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      {!address.isDefault && (
                        <Button variant="ghost" size="sm">Set as Default</Button>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center min-h-[150px]">
                  <p className="text-gray-500 mb-3">Add a new delivery address</p>
                  <Button variant="outline" size="sm">Add Address</Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'orders':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Orders</h2>
            <p className="text-gray-600">Please go to the Orders page to view your order history.</p>
            <div className="mt-4">
              <Link to="/orders">
                <Button variant="primary">View Orders</Button>
              </Link>
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Password</h3>
                <Button variant="outline">Change Password</Button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4" defaultChecked />
                    <span className="ml-2 text-gray-700">Order updates</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4" defaultChecked />
                    <span className="ml-2 text-gray-700">Promotions and deals</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4" defaultChecked />
                    <span className="ml-2 text-gray-700">Newsletter</span>
                  </label>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Delete Account</h3>
                <p className="text-gray-600 mb-3">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 font-display mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 text-primary-600 mb-3">
                <User size={40} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{mockUser.name}</h2>
              <p className="text-gray-600">{mockUser.email}</p>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${
                  activeTab === 'profile'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <User size={18} className="mr-3" />
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${
                  activeTab === 'orders'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Package size={18} className="mr-3" />
                <span>Orders</span>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${
                  activeTab === 'settings'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Settings size={18} className="mr-3" />
                <span>Settings</span>
              </button>
              
              <button
                className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <LogOut size={18} className="mr-3" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {tabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;