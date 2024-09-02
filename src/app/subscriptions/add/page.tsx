'use client';

import React, { useState } from 'react';
import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation';

export default function AddSubscriptionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    providerId: 0,
    planName: '',
    amount: 0,
    billingCycle: '',
    nextBillingDate: '',
  });

  const addSubscriptionMutation =
    api.subscription.addSubscription.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSubscriptionMutation.mutateAsync({
        ...formData,
        providerId: Number(formData.providerId),
        amount: Number(formData.amount),
        nextBillingDate: new Date(formData.nextBillingDate),
      });
      alert('Subscription added successfully!');
      router.push('/home');
    } catch (error) {
      console.error('Failed to add subscription:', error);
      alert('Failed to add subscription. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Subscription</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="providerId" className="block mb-1">
            Provider ID
          </label>
          <input
            type="number"
            id="providerId"
            name="providerId"
            value={formData.providerId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="planName" className="block mb-1">
            Plan Name
          </label>
          <input
            type="text"
            id="planName"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="billingCycle" className="block mb-1">
            Billing Cycle
          </label>
          <select
            id="billingCycle"
            name="billingCycle"
            value={formData.billingCycle}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select a billing cycle</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        <div>
          <label htmlFor="nextBillingDate" className="block mb-1">
            Next Billing Date
          </label>
          <input
            type="date"
            id="nextBillingDate"
            name="nextBillingDate"
            value={formData.nextBillingDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Subscription
        </button>
      </form>
    </div>
  );
}
