import React, { useState } from 'react';
import { api } from '~/trpc/react';

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users, isLoading } = api.user.getAllUsers.useQuery();

  const filteredUsers = users?.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="text-blue-500 hover:underline mr-2">
                  Edit
                </button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
