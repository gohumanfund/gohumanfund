import React from 'react';
import { api } from '~/trpc/react';

export default function SystemStatus() {
  const { data: status, isLoading } = api.system.getStatus.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">System Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Database</h3>
          <p>Status: {status?.database.status}</p>
          <p>Latency: {status?.database.latency}ms</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">API</h3>
          <p>Status: {status?.api.status}</p>
          <p>Requests/min: {status?.api.requestsPerMinute}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Users</h3>
          <p>Total: {status?.users.total}</p>
          <p>Active: {status?.users.active}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Subscriptions</h3>
          <p>Total: {status?.subscriptions.total}</p>
          <p>Active: {status?.subscriptions.active}</p>
        </div>
      </div>
    </div>
  );
}
