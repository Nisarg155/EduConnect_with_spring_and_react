import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative bg-black shadow-lg">
      <div className="container px-5 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <a href="#">
              <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="" />
            </a>
            <div className="flex lg:hidden">
              <button onClick={toggleMenu} type="button" className="text-gray-100 hover:text-gray-200 focus:outline-none" aria-label="toggle menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="1 0 24 24" stroke="currentColor" strokeWidth="2">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          <div className={`lg:flex lg:items-center lg:mx-8 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-100 hover:bg-gray-600 rounded-md lg:mt-0">Home</a>
              <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-100 hover:bg-gray-600 rounded-md lg:mt-0">Classes</a>
              <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-100 hover:bg-gray-600 rounded-md lg:mt-0">Materials</a>
              <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-100 hover:bg-gray-600 rounded-md lg:mt-0">About</a>
            </div>
            <div className="flex items-center mt-4 lg:mt-0">
              <button className="hidden mx-4 text-gray-100 hover:text-gray-200 focus:text-gray-200 focus:outline-none lg:block" aria-label="show notifications">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                <div className="w-8 h-8 overflow-hidden border-2 border-gray-100 rounded-full">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                </div>
                <h3 className="mx-2 text-gray-100 lg:hidden">Khatab wedaa</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
