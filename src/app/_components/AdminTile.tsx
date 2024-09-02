import React from 'react';
import Link from 'next/link';

interface AdminTileProps {
  title: string;
  description: string;
  link: string;
}

export const AdminTile: React.FC<AdminTileProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <Link href={link} className="block">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};
