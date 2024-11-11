/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowRightStartOnRectangleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import menuItems from '@/content/menuItems';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null> (null);
  const router = useRouter();

  const toggleSidebar = () => {
    if (isOpen) {
      setOpenMenuIndex(null);
    }

    setIsOpen(!isOpen);
  };

  const renderItemsMenu = () => {
    return menuItems.map((item, index) => {
      const isDropDown = item.items && item.items.length > 0;

      const handleToggleMenu = (index: number) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
      };

      const handleItem = () => {
        if (isDropDown && isOpen) {
          handleToggleMenu(index)
        } else {
          router.push(item.link)
        }
      }

      return (
        <div key={item.title}>
          <div
            onClick={handleItem}
            className="flex items-center py-2 px-4 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            {isOpen ? (
              <span className='flex justify-between w-full items-center'>
                {isDropDown
                  ? <>
                    {item.title}
                    <ChevronRightIcon
                      className={`
                        w-5 h-5 transform transition-transform duration-300
                        ${openMenuIndex === index ? 'rotate-90' : 'rotate-0'
                      }`}
                    />
                  </>
                  : item.title
                }
              </span>
            ) : (
              item.icon
            )}
          </div>

          {item.items && item.items.length > 0 && openMenuIndex === index && (
            <div className="ml-4">
              {item.items.map(subItem => (
                <Link key={subItem.title} href={subItem.link} className="block py-2 px-4 hover:bg-gray-600 transition-colors duration-200">
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    });
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
          {renderItemsMenu()}
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
