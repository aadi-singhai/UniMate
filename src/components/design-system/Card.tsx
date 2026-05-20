import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  glass?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  size = 'medium',
  glass = false,
  onClick,
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';
  
  const sizeStyles = {
    small: 'p-4',
    medium: 'p-5',
    large: 'p-6',
  };

  const cardStyles = glass
    ? 'glass-card'
    : 'bg-[var(--card-bg)] border border-[var(--border)] smooth-shadow';

  return (
    <div
      className={cn(
        baseStyles,
        cardStyles,
        sizeStyles[size],
        onClick && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
