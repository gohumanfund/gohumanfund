import React from 'react';
import { CreditCard } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

export const MonthlySummary: React.FC<{ subscriptions: any[] }> = ({
  subscriptions,
}) => {
  const totalAmount = subscriptions
    ? subscriptions.reduce((sum, sub) => sum + parseFloat(sub.amount), 0)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Monthly Summary</CardTitle>
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
  );
};
