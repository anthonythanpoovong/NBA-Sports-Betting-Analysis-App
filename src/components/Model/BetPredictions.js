import Image from 'next/image';
import { useEffect, useState } from 'react';
import Footer from "../Footer";
import nbaLogo from "/src/assets/nba-logo-transparent.png";

const BetPredictionsPage = ({ theme }) => {
  const [betPredictions, setBetPredictions] = useState([]);
  const [games, setGames] = useState([]);
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    // Fetch NBA games (replace with your API or mock data)
    const fetchGames = async () => {
      try {
        const response = await fetch('ML/NBA(1).ipynb'); // Replace with actual API
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Error fetching NBA games:', error);
      }
    };
    
    fetchGames();
  }, []);

  const handlePrediction = (gameId, prediction) => {
    // Update state with the prediction (this can be sent to an API if necessary)
    setBetPredictions(prev => [...prev, { gameId, prediction }]);
  };

  return (
    <div className={`relative flex flex-col min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="relative flex-grow py-12">
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
              NBA Bet Predictions
            </h1>
            <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>
              Bet on upcoming NBA games and make your predictions.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.length > 0 ? (
              games.map((game, index) => (
                <div key={index} className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                  <h2 className="text-xl font-semibold mb-4">{game.teamA} vs {game.teamB}</h2>
                  <p className="text-gray-500">Date: {new Date(game.date).toLocaleDateString()}</p>
                  <p className="text-gray-500">Time: {new Date(game.date).toLocaleTimeString()}</p>
                  <p className="text-gray-500">Odds: {game.oddsA} (Team A) / {game.oddsB} (Team B)</p>

                  <div className="mt-4">
                    <button
                      onClick={() => handlePrediction(game.id, game.teamA)}
                      className={`mr-4 py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                      Bet on {game.teamA}
                    </button>
                    <button
                      onClick={() => handlePrediction(game.id, game.teamB)}
                      className={`py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                      Bet on {game.teamB}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Loading games...</p>
            )}
          </section>

          <section className="mt-12 text-center">
            <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>Your Predictions</h2>
            <ul className="mt-4">
              {betPredictions.length > 0 ? (
                betPredictions.map((prediction, index) => (
                  <li key={index} className="mb-2">
                    Predicted: {prediction.prediction} for Game ID {prediction.gameId}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No predictions made yet.</p>
              )}
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BetPredictionsPage;
