/**
 * SectionHeader Component
 * Retro-styled section header with Press Start 2P font
 */

import React from 'react';

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  className = ''
}) => {
  return (
    <h2
      className={`
        font-[--font-family-display]
        text-[11px]
        leading-[16.5px]
        tracking-[0.3em]
        mb-[--spacing-lg]
        ${className}
      `}
      style={{ color: 'var(--color-text-primary)' }}
    >
      {children}
    </h2>
  );
};

export default SectionHeader;
