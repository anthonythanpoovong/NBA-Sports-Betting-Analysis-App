
import React, { useEffect, useState } from 'react';
import Footer from "./Footer";
import Image from 'next/image';
import nbalogo from "../assets/nba-logo-transparent.png";
import { fetchNbaNews } from './fetchNews';

const HomePage = ({ theme }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    const getNews = async () => {
      const articles = await fetchNbaNews();
      setNewsArticles(articles);
    };
    getNews();
  }, []);

  return (
    <div className={`py-12 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
        <div className="relative h-17 w-16 mx-auto mb-4"> {/* Use fixed height and width */}
            <Image
              src={nbalogo}
              alt="NBA Logo"
              layout="responsive" // Maintain aspect ratio
              objectFit="contain" // Ensure the image is contained within the specified dimensions
            />
          </div>
          <h1 className={`text-4xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>NBA Prediction Hub</h1>
          <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>Your go-to place for NBA predictions and insights</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
            <ul>
              {/* Replace with dynamic data */}
              <li className="flex items-center justify-between py-2">
                <span className="font-semibold">Team A vs Team B</span>
                <span className="text-gray-500">Date & Time</span>
              </li>
              <li className="flex items-center justify-between py-2">
                <span className="font-semibold">Team C vs Team D</span>
                <span className="text-gray-500">Date & Time</span>
              </li>
              {/* End of dynamic data */}
            </ul>
            <button className={`mt-4 block w-full py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>View All Predictions</button>
          </div>

          <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-xl font-semibold mb-4">Top Predictors</h2>
            <ul>
              {/* Replace with dynamic data */}
              <li className="flex items-center py-2">
                <span className="font-semibold">Predictor 1</span>
                <span className="text-gray-500 ml-auto">Accuracy: XX%</span>
              </li>
              <li className="flex items-center py-2">
                <span className="font-semibold">Predictor 2</span>
                <span className="text-gray-500 ml-auto">Accuracy: XX%</span>
              </li>
              {/* End of dynamic data */}
            </ul>
            <button className={`mt-4 block w-full py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Explore Predictors</button>
          </div>
        </section>

        <section className="mt-12">
          <div className="text-center">
            <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>Latest News</h2>
            <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>Stay updated with the latest NBA news and developments.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {newsArticles.length > 0 ? newsArticles.slice(0, 6).map((article, index) => (
              <div key={index} className={`flex flex-col p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
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
            {/* Example prediction cards */}
            <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <h3 className="text-lg font-semibold mb-2">Game Prediction 1</h3>
              <p className="text-sm text-gray-500 mb-4">Prediction details. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <a href="#" className={`block text-center py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>View Prediction</a>
            </div>
            <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <h3 className="text-lg font-semibold mb-2">Game Prediction 2</h3>
              <p className="text-sm text-gray-500 mb-4">Prediction details. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <a href="#" className={`block text-center py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>View Prediction</a>
            </div>
            <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <h3 className="text-lg font-semibold mb-2">Game Prediction 3</h3>
              <p className="text-sm text-gray-500 mb-4">Prediction details. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <a href="#" className={`block text-center py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>View Prediction</a>
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>More Insights</h2>
          <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>Explore additional insights into NBA teams, players, and statistics.</p>
          <button className={`mt-6 block mx-auto py-3 px-8 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Explore More</button>
        </section>
        <section className="mb-12"> {/* Add bottom margin */}
        </section>  
        
      </div>
        {/* Footer component */}
        <Footer theme="dark" />
    </div>
  );
};

export default HomePage;
