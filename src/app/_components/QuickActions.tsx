import React from 'react';
import { Plus, Settings } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { useRouter } from 'next/navigation';

export const QuickActions: React.FC = () => {
  const router = useRouter();

  const handleAddSubscription = () => {
    router.push('/subscriptions/add');
  };

  const handleManageSubscriptions = () => {
    router.push('/subscriptions/manage');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <button
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center justify-center mb-2"
          onClick={handleAddSubscription}
        >
          <Plus className="mr-2" size={20} />
          Add New Subscription
        </button>
        <button
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center justify-center"
          onClick={handleManageSubscriptions}
        >
          <Settings className="mr-2" size={20} />
          Manage Subscriptions
        </button>
      </CardContent>
    </Card>
  );
};
