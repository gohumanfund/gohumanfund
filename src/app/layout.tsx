import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { TRPCReactProvider } from '~/trpc/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';

export const metadata: Metadata = {
  title: 'SubHub - Unified Subscription Management',
  description: 'Manage all your subscriptions in one place',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
