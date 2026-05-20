import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`backdrop-blur-lg bg-card/80 border border-border rounded-3xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}
