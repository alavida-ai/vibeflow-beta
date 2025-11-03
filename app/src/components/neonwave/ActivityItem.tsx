/**
 * ActivityItem Component
 * Single activity feed item with timestamp
 * Part of Neonwave '94 dashboard design
 */

import React from 'react';

interface ActivityItemProps {
  message: string;
  timestamp: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  message,
  timestamp
}) => {
  return (
    <div className="flex items-start justify-between mb-[--spacing-lg]">
      <p
        className="font-[--font-family-sans] text-[14px] leading-[20px]"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {message}
      </p>
      <p
        className="font-[--font-family-sans] text-[12px] leading-[16px] ml-[--spacing-md] flex-shrink-0"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {timestamp}
      </p>
    </div>
  );
};

export default ActivityItem;
