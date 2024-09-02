'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const registerMutation = api.user.register.useMutation({
    onSuccess: () => {
      router.push('/auth/signin');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, password, name });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full p-2 rounded text-black"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 rounded text-black"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 rounded text-black"
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-600 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
