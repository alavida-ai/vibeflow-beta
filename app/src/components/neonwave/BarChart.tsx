/**
 * BarChart Component
 * Neon cyan bar chart with glow effect
 * Simple implementation for dashboard visualization
 */

import React from 'react';

interface BarChartProps {
  data: number[];
  maxHeight?: number;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  maxHeight = 256,
  className = ''
}) => {
  const maxValue = Math.max(...data);

  return (
    <div className={`flex items-end gap-[8px] ${className}`} style={{ height: `${maxHeight}px` }}>
      {data.map((value, index) => {
        const heightPercent = (value / maxValue) * 100;
        const height = (heightPercent / 100) * maxHeight;

        return (
          <div
            key={index}
            className="flex-1 rounded-tl-[--radius-sm] rounded-tr-[--radius-sm] transition-all duration-300 hover:brightness-125"
            style={{
              height: `${height}px`,
              background: 'var(--color-neon-cyan)',
              boxShadow: '0px 0px 10px 0px var(--color-shadow-neon-pink)'
            }}
          />
        );
      })}
    </div>
  );
};

export default BarChart;
