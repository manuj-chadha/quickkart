import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display leading-tight mb-4">
              Fresh Groceries Delivered to Your Doorstep
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Shop for the freshest produce, pantry essentials, and specialty items with 
              free delivery on your first order.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" as={Link} to="/products">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" as={Link} to="/how-it-works">
                How It Works
              </Button>
            </div>
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">From over 3,000 happy customers</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Fresh groceries"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white text-primary-600 text-xs font-bold px-2 py-1 rounded-full">
                    NEW CUSTOMER OFFER
                  </div>
                  <div className="text-white font-bold">
                    Free delivery on your first order!
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-20 w-20 bg-secondary-400 rounded-full blur-xl opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-accent-400 rounded-full blur-xl opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
}