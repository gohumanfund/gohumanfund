'use client';

import React, { useState } from 'react';
import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation';

export default function CreateProviderPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    apiKey: '',
    category: '',
  });

  const createProviderMutation = api.provider.createProvider.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProviderMutation.mutateAsync(formData);
      alert('Provider created successfully!');
      router.push('/admin/providers/manage');
    } catch (error) {
      console.error('Failed to create provider:', error);
      alert('Failed to create provider. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Provider</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Provider Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="apiKey" className="block mb-1">
            API Key
          </label>
          <input
            type="text"
            id="apiKey"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Provider
        </button>
      </form>
    </div>
  );
}
