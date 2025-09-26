/**
 * @file Bounded.tsx
 * @description A layout component that constrains content to a maximum width and centers it horizontally.
 */
import React from 'react';

export interface BoundedProps {
  children: React.ReactNode;
  maxWidth?: string;
  paddingOverride?: string;
  className?: string;
}

const Bounded: React.FC<BoundedProps> = ({
  children,
  maxWidth = 'max-w-7xl',
  paddingOverride = '',
  className = '',
}) => {
  return (
    <div
      className={`mx-auto ${maxWidth} ${paddingOverride} px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Bounded;