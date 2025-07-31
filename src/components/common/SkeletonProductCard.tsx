import React from 'react';

export function SkeletonProductCard() {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-200 h-48 w-full" />

      <div className="p-4 space-y-2">
        {/* Rating and Category */}
        <div className="flex space-x-4">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 rounded" />

        {/* Price */}
        <div className="h-4 w-1/2 bg-gray-200 rounded" />

        {/* Button Placeholder */}
        <div className="mt-4 h-8 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
}
