import React from 'react';
import { api } from '~/trpc/react';

export default function SystemStatus() {
  const { data: status, isLoading } = api.system.getStatus.useQuery();

  if (isLoading) return <div>Loading system status...</div>;

  if (!status) return <div>Unable to fetch system status</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">System Status</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Database</h3>
          <p>Status: {status.database.status}</p>
          <p>Latency: {status.database.latency}ms</p>
        </div>
        <div>
          <h3 className="font-semibold">API</h3>
          <p>Status: {status.api.status}</p>
          <p>Requests/min: {status.api.requestsPerMinute}</p>
        </div>
      </div>
    </div>
  );
}
