import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/common/ProductCard';
import { SkeletonProductCard } from '../components/common/SkeletonProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/common/Button';
import API from '../utils/axios';
import { Product } from '../types';
import { useCategories } from '../hooks/useCategories';

// Constants
const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000];
const ITEMS_PER_PAGE = 9;

// Main Component
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const { categories, loading: loadingCategories, error } = useCategories();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
      setCurrentPage(1);
    }

  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) =>
        (typeof p.category === 'string' ? p.category : p.category?._id) === selectedCategory
      );
    }

    // Search
    if (searchQuery.trim()) {
      setCurrentPage(1);
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price Range
    result = result.filter((p) => {
      const price = p.discountPrice
        ? p.priceMRP * (1 - p.discountPrice / 100)
        : p.priceMRP;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.priceMRP - b.priceMRP);
        break;
      case 'price-high':
        result.sort((a, b) => b.priceMRP - a.priceMRP);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setSelectedCategory('all');
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSortBy('default');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Explore fresh groceries, daily needs, and more.</p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          <Button
            variant="outline"
            size="sm"
            className="mt-2 md:hidden w-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2" size={16} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Filter className="mr-2" size={18} /> Filters
            </h2>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <FilterOption
                  label="All Categories"
                  checked={selectedCategory === 'all'}
                  onChange={() => setSelectedCategory('all')}
                />
                {categories.map((cat) => (
                  <FilterOption
                    key={cat._id}
                    label={cat.name}
                    checked={selectedCategory === cat._id}
                    onChange={() => setSelectedCategory(cat._id)}
                  />
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <RangeSlider
                value={priceRange}
                onChange={setPriceRange}
                min={0}
                max={1000}
              />
            </div>

            {/* Sort */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <Button onClick={resetFilters} variant="outline" size="sm" className="w-full">
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonProductCard key={idx} />
              ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

// Filter Option Component
const FilterOption = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <label className="flex items-center">
    <input type="radio" checked={checked} onChange={onChange} className="mr-2" />
    {label}
  </label>
);

// Range Slider Component
const RangeSlider = ({
  value,
  onChange,
  min,
  max,
}: {
  value: [number, number];
  onChange: (val: [number, number]) => void;
  min: number;
  max: number;
}) => (
  <>
    <div className="flex items-center space-x-2">
      <span>₹{value[0]}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={(e) => onChange([+e.target.value, value[1]])}
        className="w-full"
      />
      <span>₹{value[1]}</span>
    </div>
    <div className="flex items-center space-x-2 mt-2">
      <span>₹{value[0]}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={(e) => onChange([value[0], +e.target.value])}
        className="w-full"
      />
      <span>₹{value[1]}</span>
    </div>
  </>
);

// Pagination Component
const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 space-x-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        variant="outline"
      >
        Prev
      </Button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i}
          variant={currentPage === i + 1 ? 'primary' : 'outline'}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        variant="outline"
      >
        Next
      </Button>
    </div>
  );
};
