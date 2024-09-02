'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CreditCard, AlertCircle, Plus, Settings } from 'lucide-react';
import { api } from '~/trpc/react';

// Define types for props
interface CardProps {
  className?: string;
  children: ReactNode;
}

interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

// Card components
const Card: React.FC<CardProps> = ({ className = '', children }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
);

const CardHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
);

const CardTitle: React.FC<CardTitleProps> = ({ className = '', children }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="p-6">{children}</div>
);

interface SubscriptionData {
  name: string;
  value: number;
  color: string;
}

const colorPalette = [
  '#E50914',
  '#1DB954',
  '#FF9900',
  '#FF0000',
  '#718096',
  '#4A5568',
  '#2D3748',
  '#1A202C',
];

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

  const subscriptionData: SubscriptionData[] = subscriptions
    ? subscriptions.map((sub, index) => ({
        name: sub.provider.name,
        value: parseFloat(sub.amount),
        color: colorPalette[index % colorPalette.length],
      }))
    : [];

  const totalAmount = subscriptionData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Unified Subscription Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Subscription Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subscriptionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {subscriptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2">
                {subscriptionData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-2"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.name}</span>
                    </div>
                    <span>${item.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Monthly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 mb-4">
              ${totalAmount.toFixed(2)}
            </div>
            <p className="text-gray-600 mb-4">
              Next payment due: {/* Add logic for next payment date */}
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center">
              <CreditCard className="mr-2" size={20} />
              Pay Now
            </button>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Payment Assurance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Your subscriptions are protected for the next 60 days.
            </p>
            <div className="flex items-center text-yellow-600">
              <AlertCircle className="mr-2" size={20} />
              <span>2 months of coverage remaining</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center justify-center mb-2">
              <Plus className="mr-2" size={20} />
              Add New Subscription
            </button>
            <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center justify-center">
              <Settings className="mr-2" size={20} />
              Manage Subscriptions
            </button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600 mb-2">$127.50</p>
            <p className="text-gray-600">
              Total saved this year through our unified service
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
