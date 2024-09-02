'use client';

import React from 'react';
import { api } from '~/trpc/react';
import Link from 'next/link';

export default function ManageProvidersPage() {
  const { data: providers, isLoading } =
    api.provider.getAllProviders.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Providers</h1>
      <Link
        href="/admin/providers/create"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4 inline-block"
      >
        Create New Provider
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers?.map((provider) => (
              <tr key={provider.id}>
                <td className="border px-4 py-2">{provider.id}</td>
                <td className="border px-4 py-2">{provider.name}</td>
                <td className="border px-4 py-2">{provider.category}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
