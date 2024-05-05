import React, { useState } from 'react';
import Navbar from './navbar';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <header>
      <Navbar />
    </header>
  );
}

export default Header;
