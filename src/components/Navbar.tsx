import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, Users, Info, LayoutDashboard } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { SignOutButton } from './SignOutButton';

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/home" className="flex items-center">
            <Home className="mr-1" size={20} />
            Home
          </Link>
          {session && (
            <Link href="/dashboard" className="flex items-center">
              <LayoutDashboard className="mr-1" size={20} />
              Dashboard
            </Link>
          )}
          <Link href="/learn" className="flex items-center">
            <BookOpen className="mr-1" size={20} />
            Learn
          </Link>
          <Link href="/community" className="flex items-center">
            <Users className="mr-1" size={20} />
            Community
          </Link>
          <Link href="/about" className="flex items-center">
            <Info className="mr-1" size={20} />
            About
          </Link>
        </div>
        <div>
          {session ? (
            <SignOutButton />
          ) : (
            <Link
              href="/auth/signin"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Sign In/Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
