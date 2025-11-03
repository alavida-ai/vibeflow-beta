/**
 * Card Component
 * Glassmorphic card container with neon glow effect
 * Uses design tokens from /brand/strategy/design/tokens/
 */

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = true
}) => {
  return (
    <div
      className={`
        rounded-[--radius-2xl]
        ${glow
          ? 'shadow-[0px_10px_25px_0px_var(--color-shadow-neon-pink-subtle)]'
          : ''
        }
        ${className}
      `}
      style={{
        background: 'var(--color-background-card)',
      }}
    >
      {children}
    </div>
  );
};

export default Card;
