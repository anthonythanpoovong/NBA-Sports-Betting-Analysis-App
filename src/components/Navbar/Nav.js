import React, { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const initialNavigation = [
  { name: 'Home Page', href: '#home-page', current: true },
  { name: 'Bet Predictions', href: '#bet-predictions', current: false },
  { name: 'About Us', href: '#about-us', current: false },
  { name: 'Extra Nav', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [navigation, setNavigation] = useState(initialNavigation);
  const [isSun, setIsSun] = useState(true); // Initial state is sun
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for user authentication

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token
  }, []);

  useEffect(() => {
    const updateNavigationState = () => {
      const currentHash = window.location.hash;
      setNavigation((prevNavigation) =>
        prevNavigation.map((item) =>
          `#${item.href.split('#')[1]}` === currentHash
            ? { ...item, current: true }
            : { ...item, current: false }
        )
      );
    };

    // Listen for hash changes
    window.addEventListener('hashchange', updateNavigationState);

    // Update state based on initial hash
    updateNavigationState();

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('hashchange', updateNavigationState);
    };
  }, []);

  const toggleIcon = () => {
    setIsSun(!isSun); // Toggle between sun and moon
  };

  const handleSignOut = () => {
    // Clear token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);

    // Optionally, redirect to login page or home page
    window.location.href = '#home-page'; // Adjust this path based on your routing setup
    window.location.reload(); // Reload the page to reflect the sign-out state
  };

  return (
    <Disclosure as="nav" className="bg-[#7f1d1d] bg-opacity-95 shadow-lg backdrop-filter backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="logo.png"
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-white text-gray-900 rounded-lg shadow-md transition-all duration-200 transform scale-105'
                        : 'text-gray-900 hover:bg-white hover:bg-opacity-20 hover:text-white rounded-lg transition-all duration-300',
                      'px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-white bg-opacity-30 p-1 text-gray-900 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300"
              onClick={toggleIcon}
            >
              <span className="sr-only">Toggle theme</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`transform transition-transform duration-300 ease-in-out ${isSun ? 'scale-125' : 'scale-100'}`}>
                  {isSun ? (
                    <SunIcon aria-hidden="true" className="h-5 w-5" />
                  ) : (
                    <MoonIcon aria-hidden="true" className="h-5 w-5" />
                  )}
                </div>
              </div>
            </button>

            {/* Profile or Sign In button */}
            <div className="relative ml-3">
              {isLoggedIn ? (
                <Menu as="div" className="relative">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-white bg-opacity-30 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt="Profile"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white bg-opacity-50 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem>
                      <a href="#profile" className="block px-4 py-2 text-sm text-gray-900 hover:bg-white hover:bg-opacity-60">
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="#" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-900 hover:bg-white hover:bg-opacity-60">
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <button
                  onClick={() => window.location.href = '#login'}
                  className="relative rounded-md bg-white bg-opacity-25 px-3 py-2 text-gray-900 hover:bg-white hover:bg-opacity-20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-white text-gray-900 rounded-lg shadow-md transition-all duration-300 transform scale-105' : 'text-gray-900 hover:bg-white hover:bg-opacity-20 hover:text-white rounded-lg transition-all duration-300'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
