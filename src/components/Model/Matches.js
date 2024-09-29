import React from 'react';
import Footer from "../Footer";

const Matches = ({ theme }) => {
  return (
    <div id="#matches" className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <main className="flex-grow py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-base font-semibold uppercase tracking-wide ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>Stats</h2>
            <p className={`mt-1 text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} sm:text-5xl lg:text-6xl`}>NBA Stats</p>
            <p className={`mx-auto mt-5 max-w-xl text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Below are the latest NBA stats.</p>
          </div>
          <div className="mt-10 relative overflow-hidden" style={{ height: '900px' }}>
            <iframe 
              src="https://www.nba.com/standings" 
              width="100%" 
              height="950"  // Increase the height to ensure the full content is loaded
              style={{ position: 'absolute', top: '-100px', border: 'none' }}  // Adjust the 'top' value to cut off the part you want
              title="Embedded Website"
            >
              Your browser does not support iframes.
            </iframe>
          </div>
        </div>
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default Matches;
