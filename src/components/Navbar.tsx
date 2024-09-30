'use client'

import React from 'react';
import { ModeToggle } from './toggle-theme';
import { logout } from '@/lib/authClient';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const showLogout = pathname == '/login' ? false : true;

  const handleLogout = () => { 
    logout();
    router.push('/login');
  };

  return (
    <nav className="w-11/12 mx-auto flex justify-between items-center p-4 bg-background text-foreground">
      <div className="">
        <Image 
          src="/logo.png" 
          alt="AutoformsCA Logo" 
          width={100} 
          height={100} 
          className="w-auto h-10 object-cover object-center" 
        />        
      </div>
      <div className='flex items-center gap-4'>
        <ModeToggle />
        {showLogout && (
          <Button
          size={'lg'}
            onClick={handleLogout}
            className=""
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;