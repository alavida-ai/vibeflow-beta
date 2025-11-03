/**
 * StatCard Component
 * Metric display card with neon indicator dot
 * Based on Neonwave '94 Figma design
 */

import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  indicator?: 'pink' | 'cyan';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  indicator = 'pink'
}) => {
  return (
    <Card className="p-[--spacing-lg] min-w-[252px]">
      <div className="flex items-start justify-between mb-[--spacing-lg]">
        <p
          className="font-[--font-family-display] text-[10px] leading-[15px] tracking-[0.3em]"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {label}
        </p>
        <div
          className="w-[8px] h-[8px] rounded-full"
          style={{
            background: indicator === 'pink'
              ? 'var(--color-neon-pink)'
              : 'var(--color-neon-cyan)',
            boxShadow: indicator === 'pink'
              ? 'var(--shadow-neon-glow-pink)'
              : '0px 0px 8px 0px var(--color-neon-cyan)'
          }}
        />
      </div>

      <p
        className="font-[--font-family-sans] font-bold text-[30px] leading-[36px] tracking-[-0.75px] mb-[--spacing-md]"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {value}
      </p>

      {subtitle && (
        <p
          className="font-[--font-family-sans] text-[12px] leading-[16px]"
          style={{ color: 'var(--color-text-quaternary)' }}
        >
          {subtitle}
        </p>
      )}
    </Card>
  );
};

export default StatCard;
