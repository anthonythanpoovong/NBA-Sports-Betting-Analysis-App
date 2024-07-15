// components/ToggleButton.js

import React from 'react';
import { useTheme } from '../ThemeContext'; // Adjust path as necessary
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ToggleButton = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
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
      onClick={toggleTheme}
    >
      <span className="absolute -inset-0.5 border-2 border-gray-800 rounded-full" />
      <span className="sr-only">Toggle theme</span>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`transform transition-transform duration-300 ease-in-out ${isDarkTheme ? 'scale-125' : 'scale-100'}`}>
          {isDarkTheme ? (
            <SunIcon aria-hidden="true" className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon aria-hidden="true" className="h-6 w-6 text-gray-400" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ToggleButton;
