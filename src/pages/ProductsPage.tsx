import React, { useState, useEffect, useMemo } from 'react';
// import { products } from '../data/products'; // No longer needed
import { categories } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Product } from '../types';
import API from '../utils/axios';

const ProductsPage: React.FC = () => {
  // --- State for data fetched from API ---
  const [products, setProducts] = useState<Product[]>([]);

  // --- State for user-controlled filters ---
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);

  // --- Fetch products from the backend ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        console.log(response.data);
        
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []); // This effect runs only once when the component mounts

  // --- Derive filtered products using useMemo ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category.name === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Apply priceMRP range filter
    result = result.filter(product => {
      const finalPrice = product.discountPrice
        ? product.priceMRP * (1 - product.discountPrice / 100)
        : product.priceMRP;
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });

    // Apply sorting (creating a new sorted array)
    const sortedResult = [...result];
    switch (sortBy) {
      case 'priceMRP-low':
        sortedResult.sort((a, b) => {
          const priceA = a.discountPrice ? a.priceMRP * (1 - a.discountPrice / 100) : a.priceMRP;
          const priceB = b.discountPrice ? b.priceMRP * (1 - b.discountPrice / 100) : b.priceMRP;
          return priceA - priceB;
        });
        break;
      case 'priceMRP-high':
        sortedResult.sort((a, b) => {
          const priceA = a.discountPrice ? a.priceMRP * (1 - a.discountPrice / 100) : a.priceMRP;
          const priceB = b.discountPrice ? b.priceMRP * (1 - b.discountPrice / 100) : b.priceMRP;
          return priceB - priceA;
        });
        break;
      case 'rating':
        sortedResult.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return sortedResult;
  }, [products, selectedCategory, searchQuery, sortBy, priceRange]); // Recalculate only when these change

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">All Products</h1>
          <p className="text-gray-600">Browse our wide selection of fresh groceries</p>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 md:hidden w-full flex items-center justify-center"
            onClick={toggleFilters}
          >
            <SlidersHorizontal className="mr-2" size={16} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Filter className="mr-2" size={18} />
              Filters
            </h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="mr-2 text-primary-600 focus:ring-primary-500"
                  />
                  <span>All Categories</span>
                </label>
                {categories.map(category => (
                  <label key={category._id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category._id}
                      onChange={() => setSelectedCategory(category._id)}
                      className="mr-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">priceMRP Range</h3>
              <div className="flex items-center space-x-2">
                <span>${priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <span>${priceRange[1]}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span>${priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="default">Featured</option>
                <option value="priceMRP-low">priceMRP: Low to High</option>
                <option value="priceMRP-high">priceMRP: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSortBy('default');
                setPriceRange([0, 20]);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;