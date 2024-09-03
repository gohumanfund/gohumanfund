import '~/app/_styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { TRPCReactProvider } from '~/trpc/react';
import { Navbar } from '../components/Navbar';
import { SessionProvider, useSession } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'gohumanfund - Unified Subscription Management',
  description: 'Manage all your subscriptions in one place',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await useSession();
  console.log(session);
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProvider session={session.data}>
          <TRPCReactProvider>
            <Navbar />
            {children}
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
