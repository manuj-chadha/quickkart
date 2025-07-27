import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { CategoryCard } from '../common/CategoryCard';

export function FeaturedCategories() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-display">Shop by Category</h2>
          <Link to="/categories" className="text-primary-600 hover:text-primary-800 font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}