import Image from 'next/image';
import { useEffect, useState } from 'react';
import Footer from "../Footer";

import nbaLogo from "/src/assets/nba-logo-transparent.png";


const BetPredictionsPage = ({ theme }) => {
  const [betPredictions, setBetPredictions] = useState([]);
  const [userName, setUserName] = useState('');
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    // Fetch bet predictions data
    const fetchBetPredictions = async () => {
      try {
        const response = await fetch('/api/bet-predictions');
        if (response.ok) {
          const data = await response.json();
          setBetPredictions(data.predictions); // Update state with predictions
        } else {
          console.error('Failed to fetch bet predictions');
        }
      } catch (error) {
        console.error('Error fetching bet predictions:', error);
      }
    };

    fetchBetPredictions();
  }, []);

  return (
    <div className={`relative flex flex-col min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="absolute inset-0 -z-10">
        <iframe
          src="https://www.youtube.com/embed/?playlist=kPwFhpczdOg&list=PLYdcOn2qLu90LCQ-abifWisXk5AwRb-l8&autoplay=1&mute=1&controls=0&loop=1&playlist=kPwFhpczdOg"
          title="NBA Highlights"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <main className="relative flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-8">
            <div className="relative h-17 w-16 mx-auto mb-4">
              <Image
                src={nbaLogo}
                alt="NBA Logo"
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <h1 className={`text-4xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>
              Bet Predictions for NBA Games
            </h1>
            <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>
              Analyze and bet smart with our top predictions
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {betPredictions.length > 0 ? betPredictions.map((prediction, index) => (
              <div key={index} className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <h2 className="text-xl font-semibold mb-4">{prediction.match}</h2>
                <p className="mb-4 text-gray-500">{prediction.date}</p>
                <div className="mb-4">
                  <h3 className="font-semibold">Prediction:</h3>
                  <p>{prediction.predictionDetails}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold">Bet Odds:</h3>
                  <p>{prediction.odds}</p>
                </div>
                <button className={`block w-full py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                  Place Bet
                </button>
              </div>
            )) : (
              <p className={`text-center ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>
                Loading predictions...
              </p>
            )}
          </section>

          <section className="mt-12 text-center">
            <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>
              Top Predictors of the Week
            </h2>
            <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>
              Check out the best performing analysts for this week's games
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {/* Example top predictor cards */}
              <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <h3 className="text-lg font-semibold mb-2">Predictor 1</h3>
                <p className="text-sm text-gray-500 mb-4">Accuracy: 85%</p>
                <a href="#" className={`block text-center py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                  View Predictions
                </a>
              </div>
              {/* More predictor cards can go here */}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BetPredictionsPage;
