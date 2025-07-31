import React from 'react';

export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg shadow-sm p-4">
      <div className="h-48 bg-gray-300 rounded mb-4" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
    </div>
  );
}
