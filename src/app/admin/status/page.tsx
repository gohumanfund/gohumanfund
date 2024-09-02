'use client';

import React from 'react';
import { api } from '~/trpc/react';

export default function SystemStatusPage() {
  const { data: status, isLoading } = api.system.getStatus.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">System Status</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Database</h2>
          <p>Status: {status?.database.status}</p>
          <p>Latency: {status?.database.latency}ms</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">API</h2>
          <p>Status: {status?.api.status}</p>
          <p>Requests/min: {status?.api.requestsPerMinute}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p>Total: {status?.users.total}</p>
          <p>Active: {status?.users.active}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Subscriptions</h2>
          <p>Total: {status?.subscriptions.total}</p>
          <p>Active: {status?.subscriptions.active}</p>
        </div>
      </div>
    </div>
  );
}
