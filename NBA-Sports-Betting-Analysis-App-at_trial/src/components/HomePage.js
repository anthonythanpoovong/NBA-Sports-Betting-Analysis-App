import React, { useEffect, useState } from 'react';
import Footer from "./Footer";
import Image from 'next/image';
import nbalogo from "../assets/nba-logo-transparent.png";
import { fetchNbaNews } from './fetchNews';
import { jwtDecode } from 'jwt-decode';
import Navbar from "./Navbar";
import { fetchUpcomingMatches } from './fetchNBA'; // Ensure correct import path

const HomePage = ({ theme }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [userName, setUserName] = useState('');
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;

        if (userData) {
          setUserName(userData.firstName);
        } else {
          const fetchUserData = async () => {
            try {
              const response = await fetch(`/api/user/${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.ok) {
                const { user } = await response.json();
                setUserName(user.firstName);
              } else {
                console.error('Failed to fetch user data');
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };

          fetchUserData();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    const getNews = async () => {
      const articles = await fetchNbaNews();
      setNewsArticles(articles);
    };

    const getUpcomingMatches = async () => {
      const matches = await fetchUpcomingMatches();
      setUpcomingMatches(matches);
    };

    getNews();
    getUpcomingMatches();
  }, []);

  return (
    <div className={`relative min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>
      {/* Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="relative w-full h-0 pb-[56.35%]">
          <iframe
            src="https://www.youtube.com/embed/?playlist=kPwFhpczdOg&list=PLYdcOn2qLu90LCQ-abifWisXk5AwRb-l8&autoplay=1&mute=1&controls=0&loop=1&playlist=kPwFhpczdOg"
            title="NBA Highlights"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div> {/* Vignette effect */}
        </div>
      </div>

      {/* Content that scrolls over the video */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-8">
              <div className="relative h-17 w-16 mx-auto mb-4">
                <Image
                  src={nbalogo}
                  alt="NBA Logo"
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
              <h1 className={`text-4xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>
                Welcome {userName ? `${userName}` : ''} to NBA Prediction Hub
              </h1>
              <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>
                Your go-to place for NBA predictions and insights
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upcoming Matches and Top Predictors */}
              <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} slide-up`}>
                <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
                <ul>
                  {upcomingMatches.length > 0 ? (
                    upcomingMatches.slice(0, 2).map((match) => (
                      <li key={match.id} className="flex items-center justify-between py-2">
                        <span className="font-semibold">
                          {match.home_team.full_name} vs {match.visitor_team.full_name}
                        </span>
                        <span className="text-gray-500">
                          {new Date(match.date).toLocaleString()} {/* Format the date */}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="py-2">No upcoming matches.</li>
                  )}
                </ul>
                <button className={`mt-4 block w-full py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                  View All Predictions
                </button>
              </div>

              <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} slide-up`}>
                <h2 className="text-xl font-semibold mb-4">Top Predictors</h2>
                <ul>
                  <li className="flex items-center py-2">
                    <span className="font-semibold">Predictor 1</span>
                    <span className="text-gray-500 ml-auto">Accuracy: XX%</span>
                  </li>
                  <li className="flex items-center py-2">
                    <span className="font-semibold">Predictor 2</span>
                    <span className="text-gray-500 ml-auto">Accuracy: XX%</span>
                  </li>
                </ul>
                <button className={`mt-4 block w-full py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                  Explore Predictors
                </button>
              </div>
            </section>

            <section className="mt-11">
              <div className="text-center">
                <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>Latest News</h2>
                <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>Stay updated with the latest NBA news and developments.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {newsArticles.length > 0 ? newsArticles.slice(1, 7).map((article, index) => (
                  <div key={index} className={`flex flex-col p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} slide-up`}>
                    <div className="flex-grow mb-4">
                      {article.urlToImage && (
                        <div className="relative h-40 w-full mb-4">
                          <Image
                            src={article.urlToImage}
                            alt={article.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">{article.description}</p>
                    </div>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className={`block mt-auto text-center py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Read More</a>
                  </div>
                )) : (
                  <p className={`text-center ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>Loading news...</p>
                )}
              </div>
            </section>

            <section className="mt-12 text-center">
              <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>Featured Predictions</h2>
              <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>Check out our highlighted predictions for upcoming NBA games.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} slide-up`}>
                  <h3 className="text-lg font-semibold mb-2">Game Prediction 1</h3>
                  <p className="text-sm text-gray-500">Details about the prediction.</p>
                </div>
                <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} slide-up`}>
                  <h3 className="text-lg font-semibold mb-2">Game Prediction 2</h3>
                  <p className="text-sm text-gray-500">Details about the prediction.</p>
                </div>
                <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} slide-up`}>
                  <h3 className="text-lg font-semibold mb-2">Game Prediction 3</h3>
                  <p className="text-sm text-gray-500">Details about the prediction.</p>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
