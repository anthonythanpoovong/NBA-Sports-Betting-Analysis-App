'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import AboutUs from '../components/Model/AboutUs.js';
import HomePage from "../components/HomePage.js";
import BetPredictions from '../components/Model/BetPredictions.js';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about-us') {
        setCurrentPage('about-us');
      } else if (window.location.hash === '#bet-predictions') {
        setCurrentPage('bet-predictions');
      } else {
        setCurrentPage('home-page');
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Check the initial hash value
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <main className="bg-[#333333] min-h-screen">
      {/* bg-gray-900 min-h-screen */}
      <div>
        <Navbar />
        {currentPage === 'home-page' && <HomePage theme="dark"/>}
        {currentPage === 'about-us' && <AboutUs theme="dark"/>}
        {currentPage === 'bet-predictions' && <BetPredictions />}
      </div>
    </main>
  );
}
