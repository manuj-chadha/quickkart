import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { categories } from '../../data/categories';
import { CategoryCard } from '../common/CategoryCard';
import { Category } from '../../types';
import { getCategories } from '../../data/categories';

export function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const data = await getCategories();
          setCategories(data);
        } catch (err) {
          setError('Failed to fetch categories.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategories();
    }, []);
  
    if (loading) return <div className="text-center mt-8 text-gray-600">Loading categories...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
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
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}