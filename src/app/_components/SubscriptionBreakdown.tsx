import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

interface Subscription {
  provider: {
    name: string;
  };
  amount: string;
}

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

const emptyData = [{ name: 'No Data', value: 1, color: '#E2E8F0' }];

export const SubscriptionBreakdown: React.FC<{
  subscriptions: Subscription[] | undefined;
}> = ({ subscriptions }) => {
  const subscriptionData: SubscriptionData[] =
    subscriptions && subscriptions.length > 0
      ? subscriptions.map((sub: Subscription, index: number) => ({
          name: sub.provider.name,
          value: parseFloat(sub.amount),
          color: colorPalette[index % colorPalette.length],
        }))
      : emptyData;

  const hasData = subscriptions && subscriptions.length > 0;

  return (
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
                  paddingAngle={hasData ? 5 : 0}
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
            {hasData ? (
              subscriptionData.map((item, index) => (
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
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No subscription data available
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
