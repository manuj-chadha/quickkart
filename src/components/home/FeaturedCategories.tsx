import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryCard } from '../common/CategoryCard';
import { SkeletonCategoryCard } from '../common/SkeletonCategoryCard.tsx';
import { Category } from '../../types';
import { getCategories } from '../../data/categories';

export function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const CATEGORY_LIMIT = 6;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.slice(0, CATEGORY_LIMIT)); // show only limited categories
      } catch (err) {
        console.error(err);
        setError('Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-display">Shop by Category</h2>
          <Link to="/categories" className="text-primary-600 hover:text-primary-800 font-medium">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: CATEGORY_LIMIT }).map((_, i) => (
              <SkeletonCategoryCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-600">No categories available.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
