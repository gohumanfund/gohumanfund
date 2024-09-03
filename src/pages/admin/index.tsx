"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import ManageUsers from "../../../../gohuman.fund-old1/src/components/ManageUsers";
import SystemStatus from "../../../../gohuman.fund-old1/src/components/SystemStatus";
import QuickActions from "../../../../gohuman.fund-old1/src/components/QuickActions";
import AdminTile from "../../../../gohuman.fund-old1/src/components/AdminTile";

export default function AdminPage() {
  const router = useRouter();
  const { data: user, isLoading } = api.user.getProfile.useQuery();

  useEffect(() => {
    if (!isLoading && (!user || !user.admin)) {
      router.push("/home");
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
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AdminTile title="Total Users" value={totalUsers} />
        <AdminTile title="Active Users" value={activeUsers} />
        <AdminTile title="Total Subscriptions" value={totalSubscriptions} />
        <AdminTile title="Active Subscriptions" value={activeSubscriptions} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-lg bg-white p-6 shadow-md">
          <QuickActions />
        </section>
        <section className="rounded-lg bg-white p-6 shadow-md">
          <SystemStatus />
        </section>
        <section className="col-span-2 rounded-lg bg-white p-6 shadow-md">
          <ManageUsers />
        </section>
      </div>
    </div>
  );
}
