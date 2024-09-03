"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Home, BookOpen, Users, Info, LayoutDashboard } from "lucide-react";
import { SignOutButton } from "./SignOutButton";
import { useSession } from "next-auth/react";

export function Navbar() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
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
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Sign In/Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
