'use client';

import React, { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import { SubscriptionBreakdown } from './SubscriptionBreakdown';
import { MonthlySummary } from './MonthlySummary';
import { PaymentAssurance } from './PaymentAssurance';
import { QuickActions } from './QuickActions';
import { Savings } from './Savings';

export function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const { data: profile, isLoading: profileLoading } =
    api.user.getProfile.useQuery();
  const { data: subscriptions, isLoading: subscriptionsLoading } =
    api.subscription.getUserSubscriptions.useQuery();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || profileLoading || subscriptionsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Unified Subscription Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <QuickActions />
      </div>
    </div>
  );
}

export default Dashboard;
