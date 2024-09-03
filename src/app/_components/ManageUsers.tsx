import React, { useState } from 'react';
import { api } from '~/trpc/react';

export default function ManageUsers() {
  const { data: users, isLoading, refetch } = api.user.getAllUsers.useQuery();
  const createUserMutation = api.user.createUser.useMutation();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    admin: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserMutation.mutateAsync(newUser);
      alert('User created successfully!');
      setNewUser({ name: '', email: '', password: '', admin: false });
      refetch();
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Create User Form */}
      <form
        onSubmit={handleCreateUser}
        className="mb-8 p-4 bg-gray-100 rounded"
      >
        <h3 className="text-xl font-semibold mb-2">Create New User</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="p-2 border rounded"
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="admin"
              checked={newUser.admin}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="admin">Admin</label>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create User
        </button>
      </form>

      {/* Users Table */}
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
