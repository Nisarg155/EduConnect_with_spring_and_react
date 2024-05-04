import React, { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="bg-white shadow-lg text-xl rounded-lg md:h-12">
        <div className="flex items-center justify-between px-6 md:px-4">
          <div className="flex items-center md:w-1/5">
            <a href="#" className="font-semibold py-2">Mattismyname</a>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setOpen(!open)} 
              className="block text-gray-500 focus:outline-none">
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} 
                />
              </svg>
            </button>
          </div>
          <div className={`hidden md:flex md:w-3/5 ${open ? '' : 'justify-center'}`}>
            <a href="#" className="px-4 py-2 font-semibold">Home</a>
            <a href="#" className="px-4 py-2 font-semibold">About Us</a>
            <a href="#" className="px-4 py-2 font-semibold">Products</a>
            <a href="#" className="px-4 py-2 font-semibold">Contact</a>
          </div>
          <div className="hidden md:flex md:w-1/5 justify-end">
            <button className="px-4 py-2 font-semibold">Login</button>
            <button className="px-4 py-2 font-semibold">Sign Up</button>
          </div>
        </div>
        <div className={`md:hidden ${open ? 'block' : 'hidden'}`}>
          <div className="px-4 pt-2 pb-4">
            <a href="#" className="block px-4 py-2 font-semibold">Home</a>
            <a href="#" className="block px-4 py-2 font-semibold">About Us</a>
            <a href="#" className="block px-4 py-2 font-semibold">Products</a>
            <a href="#" className="block px-4 py-2 font-semibold">Contact</a>
            <button className="block px-4 py-2 font-semibold">Login</button>
            <button className="block px-4 py-2 font-semibold">Sign Up</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
