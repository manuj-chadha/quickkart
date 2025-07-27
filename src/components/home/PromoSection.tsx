import React from 'react';
import { ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PromoSection() {
  return (
    <section className="py-12 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 font-display mb-4">Why Choose QuickKart?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We're committed to making grocery shopping simple, fast, and enjoyable with premium quality products.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Free Delivery</h3>
            <p className="text-gray-600">Free delivery on orders over $50. We deliver to your doorstep.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
            <p className="text-gray-600">We source only the freshest and highest quality products for you.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your groceries delivered within 2 hours with our express delivery.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Weekly Deals</h3>
            <p className="text-gray-600">Discover new deals and discounts every week on your favorite items.</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md inline-block transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}