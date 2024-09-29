'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import VehicleFormProcessor from '@/components/VehicleFormProcessor';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="my-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <h1 className="text-4xl tracking-wider font-funky text-center my-8">
        Brand forms in secondss
        </h1>
        
        <div className="my-8">
          <VehicleFormProcessor />
        </div>
      </div>
    </main>
  );
}

