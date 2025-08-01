import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Product } from '../types';

const DealsPage: React.FC = () => {
  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const allProducts = await getAllProducts();
      const deals = allProducts.filter((product) => product.discountPrice);
      setDealsProducts(deals);
    };
    fetchDeals();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 font-display mb-4">Special Deals & Offers</h1>
        <p className="text-lg text-gray-600">Discover amazing savings on your favorite products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dealsProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
