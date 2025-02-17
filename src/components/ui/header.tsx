import { useState } from 'react';
import { ModeToggle } from '../mode-toggle';
import { TMenuItem } from '@/types/menu-item.type';

const NavItem = ({ label, url }: TMenuItem) => (
  <a href={url} className='text-gray-600 dark:text-white hover:text-blue-500'>
    {label}
  </a>
);

const NavItemResponsive = ({ label, url }: TMenuItem) => (
  <a
    href={url}
    className='block text-gray-600 dark:text-white hover:text-blue-500'
  >
    {label}
  </a>
);

export default function Header({
  menuItems,
}: Readonly<{ menuItems: TMenuItem[] }>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='bg-white shadow-md sticky top-0 z-50 dark:bg-gray-800 dark:text-white'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        <a href='/' className='text-2xl text-gray-800 dark:text-white'>
          RIVA
        </a>

        <nav className='hidden md:flex space-x-6  items-center '>
          {menuItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}

          <ModeToggle />
        </nav>

        <button
          className='md:hidden text-gray-600'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✖' : '☰'}
        </button>
      </div>

      {isOpen && (
        <nav className='md:hidden bg-white dark:bg-gray-800 shadow-md absolute top-16 left-0 w-full p-4 space-y-2'>
          {menuItems.map((item) => (
            <NavItemResponsive key={item.label} {...item} />
          ))}
          <ModeToggle />
        </nav>
      )}
    </header>
  );
}
