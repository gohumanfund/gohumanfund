import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DashboardWithNoSSR = dynamic(() => import('./_components/Dashboard'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardWithNoSSR />
      </Suspense>
    </main>
  );
}
