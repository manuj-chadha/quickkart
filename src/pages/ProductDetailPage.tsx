import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import { Star, ShoppingCart, Truck, ArrowLeft, Minus, Plus } from 'lucide-react';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/common/ProductCard';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { SkeletonProductCard } from '../components/common/SkeletonProductCard';

const ProductDetailPage: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!_id) return;

    const fetchData = async () => {
      try {
        const prod = await getProductById(_id);
        if (!prod) throw new Error('Product not found');
        setProduct(prod);

        const relatedList = await getProductsByCategory(prod.category?._id);
        const filtered = relatedList.filter(p => p._id !== prod._id).slice(0, 4);
        setRelated(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [_id]);

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  const handleAddToCart = () => product && addToCart(product, quantity);

  const displayPrice = product?.discountPrice
    ? product.priceMRP * (1 - product.discountPrice / 100)
    : product?.priceMRP;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500 text-lg">Loading product...</div>
        <div className="grid grid-cols-1 gap-6 mt-6">
          <SkeletonProductCard />
          {/* {Array.from({ length: 4 }).map((_, i) => (
          ))} */}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
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

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-contain"
              style={{ maxHeight: '400px' }}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center">
              <span className="text-sm text-gray-500 capitalize">{product.category?.name || 'Uncategorized'}</span>
              <span
                className={`ml-4 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  product.stockCount > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-sm ml-1 text-gray-600">{product.rating}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-500">{product.stockCount} in stock</span>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-gray-900">₹{(displayPrice ?? 0).toFixed(2)}</span>
              {product.discountPrice > 0 && (
                <>
                  <span className="text-gray-500 line-through text-lg ml-2">
                    ₹{product.priceMRP.toFixed(2)}
                  </span>
                  <span className="ml-2 bg-accent-500 text-white text-xs font-bold rounded-full px-2 py-1">
                    {product.discountPrice}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6 flex items-center">
              <Truck className="text-primary-600 mr-2" size={20} />
              <span className="text-sm text-gray-700">Free delivery on orders over ₹50</span>
            </div>

            <div className="mb-6 flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:text-primary-600"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-3 py-2 text-gray-700">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:text-primary-600"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="flex-1 flex items-center justify-center"
                onClick={handleAddToCart}
                disabled={product.stockCount <= 0}
              >
                <ShoppingCart className="mr-2" size={20} />
                {product.stockCount > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
