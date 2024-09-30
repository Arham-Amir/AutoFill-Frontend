'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import VehicleFormProcessor from '@/components/VehicleFormProcessor';
import Auth from '@/components/auth';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = Auth();

  // If authentication is still being checked, show loader
  if (isAuthenticated === null) {
    return (
      <div className="my-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <main className="flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <div className="my-8">
          <VehicleFormProcessor />
        </div>
      </div>
    </main>
  );
}

