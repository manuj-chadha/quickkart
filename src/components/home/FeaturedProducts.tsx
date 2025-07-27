import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-display">Featured Products</h2>
          <Link to="/products" className="text-primary-600 hover:text-primary-800 font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}