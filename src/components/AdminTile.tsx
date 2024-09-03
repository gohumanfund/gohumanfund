import React from 'react';

interface AdminTileProps {
  title: string;
  value: number | string;
}

export default function AdminTile({ title, value }: AdminTileProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
