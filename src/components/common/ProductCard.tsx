import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { Button } from './Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const displayPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover object-center group-hover:opacity-90 transition-opacity"
          />
        </div>
        
        {product.discount && (
          <div className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold rounded-full px-2 py-1">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm ml-1 text-gray-600">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">{product.category}</span>
        </div>
        
        <h3 className="text-gray-900 font-medium text-lg mb-1 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            {product.discount ? (
              <>
                <span className="text-gray-900 font-bold">${displayPrice.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-sm ml-2">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
            )}
            <span className="text-gray-500 text-sm ml-1">/ {product.unit}</span>
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