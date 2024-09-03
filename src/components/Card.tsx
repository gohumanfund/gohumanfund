import React, { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
);

export const CardHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({
  className = '',
  children,
}) => <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;

export const CardContent: React.FC<{ children: ReactNode }> = ({
  children,
}) => <div className="p-6">{children}</div>;
