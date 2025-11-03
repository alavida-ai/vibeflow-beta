/**
 * NeonButton Component
 * Retro-styled button with translucent background
 * Uses Press Start 2P font for authentic retro feel
 */

import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'px-[--spacing-md] py-[--spacing-sm] text-[10px]',
    md: 'px-[--spacing-lg] py-[--spacing-sm] text-[12px]',
    lg: 'px-[--spacing-xl] py-[--spacing-md] text-[12px]'
  };

  return (
    <button
      onClick={onClick}
      className={`
        font-[--font-family-display]
        leading-[16px]
        rounded-[--radius-md]
        border border-solid
        transition-all duration-200
        hover:brightness-110
        active:scale-95
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        background: 'var(--color-background-button)',
        borderColor: 'var(--color-border-secondary)',
        color: 'var(--color-text-primary)',
      }}
    >
      {children}
    </button>
  );
};

export default NeonButton;
