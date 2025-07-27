import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50',
        {
          'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500': variant === 'primary',
          'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500': variant === 'secondary',
          'border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500': variant === 'outline',
          'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500': variant === 'ghost',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}