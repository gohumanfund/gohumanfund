import React from 'react';

interface AdminTileProps {
  title: string;
  description: string;
  onClick: () => void;
}

export const AdminTile: React.FC<AdminTileProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
