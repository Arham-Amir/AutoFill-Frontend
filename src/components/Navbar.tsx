'use client'

import React from 'react';
import { ModeToggle } from './toggle-theme';
import { logout } from '@/lib/authClient';
import { useRouter, usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Show logout button on all pages except login and root
  const showLogout = pathname == '/login' ? false : true;

  const handleLogout = () => { 
    logout();
    router.push('/login');
  };

  return (
    <nav className="w-11/12 mx-auto flex justify-between items-center p-4 bg-background text-foreground">
      <div className="text-2xl font-bold">AutoformsCA</div>
      <div className='flex items-center'>
        <ModeToggle />
        {showLogout && (
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;