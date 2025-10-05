// This is a mock implementation of shadcn/ui's resizable components
// to allow the layout to render without the actual library.

import React from 'react';

// A simple div that lays out its children horizontally or vertically
export const ResizablePanelGroup = ({
  direction = 'horizontal',
  children,
  className = '',
}: {
  direction?: 'horizontal' | 'vertical';
  children: React.ReactNode;
  className?: string;
}) => {
  const directionClass = direction === 'vertical' ? 'flex-col' : 'flex-row';
  return (
    <div className={`flex ${directionClass} w-full h-full ${className}`}>
      {children}
    </div>
  );
};

// A div that takes up flexible space
export const ResizablePanel = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
  defaultSize?: number;
  minSize?: number;
}) => {
  return (
    <div className={`flex-grow flex-shrink basis-0 ${className}`}>
      {children}
    </div>
  );
};

// A visual divider
export const ResizableHandle = ({
  withHandle = false,
  className = '',
}: {
  withHandle?: boolean;
  className?: string;
}) => {
  return (
    <div className={`bg-[#333333] w-px h-full mx-1 relative ${className}`}>
      {withHandle && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-8 bg-gray-500 rounded-full" />
      )}
    </div>
  );
};