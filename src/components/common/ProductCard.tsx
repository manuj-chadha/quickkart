import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { Button } from './Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product?: Product;
  isLoading?: boolean;
}

export function ProductCard({ product, isLoading = false }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) addToCart(product, 1);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm animate-pulse">
        <div className="h-48 bg-gray-200 rounded-t-lg" />
        <div className="p-4 space-y-3">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-6 w-3/4 bg-gray-300 rounded" />
          <div className="flex items-center justify-between mt-2">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const displayPrice = product.discountPrice
    ? product.priceMRP * (1 - product.discountPrice / 100)
    : product.priceMRP;

  const weightDisplay =
    product.weightUnit?.value && product.weightUnit?.unit
      ? `${product.weightUnit.value} ${product.weightUnit.unit}`
      : product.weightUnit?.unit || '';

  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-48 w-full object-cover object-center group-hover:opacity-90 transition-opacity"
          />
        </div>

        {product.discountPrice && (
          <div className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold rounded-full px-2 py-1">
            {product.discountPrice}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm ml-1 text-gray-600">
              {product.rating ?? ''}
            </span>
          </div>
          {product.category && (
            <span className="text-xs text-gray-500 ml-2">
              {typeof product.category === 'string'
                ? product.category
                : product.category.name}
            </span>
          )}
        </div>

        <h3 className="text-gray-900 font-medium text-lg mb-1 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            {product.discountPrice ? (
              <>
                <span className="text-gray-900 font-bold">
                  ₹{displayPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-sm ml-2">
                  ₹{product.priceMRP.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-bold">
                ₹{product.priceMRP.toFixed(2)}
              </span>
            )}
            {weightDisplay && (
              <span className="text-gray-500 text-sm ml-1">/ {weightDisplay}</span>
            )}
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
