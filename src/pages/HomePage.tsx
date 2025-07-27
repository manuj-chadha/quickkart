import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromoSection } from '../components/home/PromoSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoSection />
    </div>
  );
};

export default HomePage;