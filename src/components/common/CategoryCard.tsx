import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative block overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md"
    >
      <div className="aspect-w-1 aspect-h-1 h-40 w-full">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 w-full p-4">
        <h3 className="text-xl font-bold text-white">{category.name}</h3>
      </div>
    </Link>
  );
}