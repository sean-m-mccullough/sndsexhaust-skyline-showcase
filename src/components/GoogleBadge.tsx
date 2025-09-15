import React from 'react';

interface GoogleBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const GoogleBadge: React.FC<GoogleBadgeProps> = ({ 
  size = 'md',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3 text-xs',
    md: 'w-4 h-4 text-xs',
    lg: 'w-5 h-5 text-sm'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex items-center space-x-2 text-muted-foreground">
      <div className={`${sizeClasses[size]} bg-red-500 rounded-full flex items-center justify-center text-white font-bold`}>
        G
      </div>
      {showText && (
        <span className={textSizeClasses[size]}>Google Review</span>
      )}
    </div>
  );
};
