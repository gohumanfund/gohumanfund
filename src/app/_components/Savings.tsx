import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

export const Savings: React.FC = () => (
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
);
