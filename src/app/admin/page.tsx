'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import CreateProviderForm from '../_components/CreateProviderForm';
import ManageProviders from '../_components/ManageProviders';
import ManageUsers from '../_components/ManageUsers';
import SystemStatus from '../_components/SystemStatus';

export default function AdminDashboard() {
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md">
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md">
          <ManageUsers />
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md">
          <SystemStatus />
        </section>
      </div>
    </div>
  );
}
