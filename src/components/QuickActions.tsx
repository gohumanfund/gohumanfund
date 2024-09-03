import React from 'react';

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
      <div className="space-y-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
          Send Newsletter
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
          Generate Report
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full">
          Manage Content
        </button>
      </div>
    </div>
  );
}
