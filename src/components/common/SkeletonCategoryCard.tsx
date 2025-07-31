import React from 'react';

export function SkeletonCategoryCard() {
  return (
    <div className="animate-pulse flex flex-col items-center bg-white rounded-lg shadow-sm p-4">
      <div className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
      <div className="h-4 w-20 bg-gray-200 rounded" />
    </div>
  );
}
