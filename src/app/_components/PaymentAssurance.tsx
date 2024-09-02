import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

export const PaymentAssurance: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl font-semibold">Payment Assurance</CardTitle>
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
);
