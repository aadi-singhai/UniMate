import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'outlined' | 'filled';
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  variant = 'outlined',
  icon,
  error,
  className,
  ...props
}) => {
  const variants = {
    outlined: 'border-2 border-[var(--border)] bg-transparent focus:border-[var(--primary)]',
    filled: 'bg-[var(--card-bg)] border-2 border-transparent focus:border-[var(--primary)]',
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-label text-[var(--text)] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-50">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-4 py-3 rounded-2xl text-[var(--text)] transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-20',
            variants[variant],
            icon && 'pl-12',
            error && 'border-[var(--error)]',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-caption text-[var(--error)]">{error}</p>
      )}
    </div>
  );
};
