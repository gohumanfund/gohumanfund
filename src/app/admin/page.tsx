'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { AdminTile } from '../_components/AdminTile';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: user, isLoading } = api.user.getProfile.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.admin) {
    router.push('/home');
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminTile
          title="Create New Provider"
          description="Add a new service provider to the system"
          link="/admin/providers/create"
        />
        <AdminTile
          title="Manage Providers"
          description="View and edit existing service providers"
          link="/admin/providers/manage"
        />
        <AdminTile
          title="Manage Users"
          description="View and manage user accounts"
          link="/admin/users"
        />
        <AdminTile
          title="System Status"
          description="View system health and performance metrics"
          link="/admin/status"
        />
      </div>
    </div>
  );
}
