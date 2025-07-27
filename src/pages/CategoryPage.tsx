import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../data/products';
import { categories } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { ArrowLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const products = getProductsByCategory(id || '');
  const category = categories.find(cat => cat.id === id);
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p className="mb-8">The category you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="text-primary-600 hover:text-primary-800 font-medium">
          Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6">
        <ArrowLeft className="mr-1" size={16} />
        Back to Products
      </Link>
      
      <div className="relative rounded-lg overflow-hidden mb-8 h-48">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl font-bold text-white font-display">{category.name}</h1>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">There are no products in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;