'use client';

import React from 'react';
import { api } from '~/trpc/react';

export default function ManageUsersPage() {
  const { data: users, isLoading } = api.user.getAllUsers.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Plan Tier</th>
              <th className="px-4 py-2">Admin</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.planTier}</td>
                <td className="border px-4 py-2">
                  {user.admin ? 'Yes' : 'No'}
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                    Ban
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
