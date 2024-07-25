import React, { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
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

  const handleNavigationClick = (clickedItemName) => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) =>
        item.name === clickedItemName
          ? { ...item, current: true }
          : { ...item, current: false }
      )
    );
  };

  const toggleIcon = () => {
    setIsSun(!isSun); // Toggle between sun and moon
  };

  return (
    <Disclosure as="nav" className="bg-[#7f1d1d]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="logo.png"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    onClick={() => handleNavigationClick(item.name)}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white rounded-lg shadow-md transition-all duration-200 transform scale-105' : 'text-gray-300 hover:bg-gray-650 hover:text-white rounded-lg transition-all duration-300',
                      'block px-3 py-2 text-sm font-medium',
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
              className={`
                relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800
                transition-all duration-300 border-2 border-gray-800
              `}
              style={{
                width: '2rem',
                height: '2rem',
              }}
              onClick={toggleIcon}
            >
              <span className="absolute -inset-0.5 border-2 border-gray-800 rounded-full" />
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

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
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
              onClick={() => handleNavigationClick(item.name)}
              className={classNames(
                item.current ? 'bg-gray-900 text-white rounded-lg shadow-md transition-all duration-300 transform scale-105' : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-300',
                'block px-3 py-2 text-base font-medium',
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
