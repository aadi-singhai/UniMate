import React from 'react';
import { cn } from '../../lib/utils';

interface StatusChipProps {
  status: 'pending' | 'approved' | 'resolved' | 'in-review';
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, className }) => {
  const statusConfig = {
    pending: {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-600 dark:text-orange-400',
      label: 'Pending',
    },
    'in-review': {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      label: 'In Review',
    },
    resolved: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      label: 'Resolved',
    },
    approved: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      label: 'Approved',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-caption',
        config.bg,
        config.text,
        className
      )}
    >
      {config.label}
    </span>
  );
};
