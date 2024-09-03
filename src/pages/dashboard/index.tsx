import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';
import Dashboard from '~/components/Dashboard';
export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>
        Welcome to your personal dashboard. Here you can manage your
        subscriptions and account settings.
      </p>
      <Dashboard />
    </div>
  );
}
