import React from 'react';
import Navbar from '@/components/Navbar';
import VehicleFormProcessor from '@/components/VehicleFormProcessor';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 flex-grow">
        <h1 className="text-4xl tracking-wider font-funky text-center my-8">
          Transform your vehicle data into actionable insights
        </h1>
        
        <div className="my-8">
          <VehicleFormProcessor />
        </div>
      </div>
      
      <footer className="bg-background text-foreground py-4 text-center">
        <p>&copy; 2024 YourCompany. All rights reserved.</p>
      </footer>
    </main>
  );
}

