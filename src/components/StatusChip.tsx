import React from 'react';

type Status = 'pending' | 'in-review' | 'resolved' | 'approved' | 'rejected';

interface StatusChipProps {
  status: Status;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-[#F59E0B] text-white',
  },
  'in-review': {
    label: 'In Review',
    className: 'bg-[#335CFF] dark:bg-[#3A6BFF] text-white',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-[#19E68C] text-white',
  },
  approved: {
    label: 'Approved',
    className: 'bg-[#19E68C] text-white',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-[#EF4444] text-white',
  },
};

export function StatusChip({ status }: StatusChipProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${config.className}`}>
      {config.label}
    </span>
  );
}
