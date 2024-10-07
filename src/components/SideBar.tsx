'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowRightStartOnRectangleIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import menuItems from '@/content/menuItems';
import { useAuth } from '@/context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col h-full bg-primary text-white ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300 `}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-lg font-bold transition-opacity duration-300 ${isOpen ? 'block' : 'hidden'}`}>{user?.name}</h1>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <ChevronLeftIcon
           className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
          />
        </button>
      </div>
      <nav className="flex flex-col py-8 justify-between h-full">
        <div className='flex flex-col'>
          {menuItems.map(item => (
            <Link key={item.title} href={item.link} className="flex items-center py-2 px-4 hover:bg-gray-700 transition-colors duration-200">
              {isOpen ? (
                <span>{item.title}</span>
              ) : (
                item.icon
              )}
            </Link>
          ))}
        </div>
        <div className='flex flex-col'>
         <div onClick={logout} className="py-2 px-4 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
          {isOpen ? <span>Sair</span> : <ArrowRightStartOnRectangleIcon  className="w-6 h-6" /> }
         </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
