import React from 'react';
import { ModeToggle } from './toggle-theme';

const Navbar: React.FC = () => {
  return (
    <nav className="w-11/12 mx-auto flex justify-between items-center p-4 bg-background text-foreground">
      <div className="text-2xl font-bold">AutoForm</div>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;