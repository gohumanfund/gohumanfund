'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import ManageUsers from '../../components/ManageUsers';
import SystemStatus from '../../components/SystemStatus';
import QuickActions from '../../components/QuickActions';
import AdminTile from '../../components/AdminTile';

export default function AdminPage() {
  const router = useRouter();
  const { data: user, isLoading } = api.user.getProfile.useQuery();

  useEffect(() => {
    if (!isLoading && (!user || !user.admin)) {
      router.push('/home');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.admin) {
    return null;
  }

  // TODO: Replace with actual data
  const totalUsers = 100;
  const activeUsers = 80;
  const totalSubscriptions = 500;
  const activeSubscriptions = 450;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminTile title="Total Users" value={totalUsers} />
        <AdminTile title="Active Users" value={activeUsers} />
        <AdminTile title="Total Subscriptions" value={totalSubscriptions} />
        <AdminTile title="Active Subscriptions" value={activeSubscriptions} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <QuickActions />
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md">
          <SystemStatus />
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md col-span-2">
          <ManageUsers />
        </section>
      </div>
    </div>
  );
}
