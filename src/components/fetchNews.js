// fetchNews.js
import axios from 'axios';

const API_KEY = 'f101cc9c03b844da9cc723a3bb0c4d4c'; // Replace with your News API key
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNbaNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: 'NBA ',
        apiKey: API_KEY,
        language: 'en',
        sortBy: 'publishedAt',
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching NBA news:', error);
    return [];
  }
};

export const fetchUpcomingMatches = async () => {
    try {
      const response = await axios.get('https://www.balldontlie.io/api/v1/games', {
        params: {
          start_date: '2024-07-01', // Example start date (YYYY-MM-DD)
          end_date: '2024-07-31',   // Example end date (YYYY-MM-DD)
        },
      });
      return response.data.data.map(match => ({
        home_team: match.home_team.full_name,
        away_team: match.visitor_team.full_name,
        dateTime: match.date, // Adjust based on the actual date/time format from the API
      }));
    } catch (error) {
      console.error('Error fetching upcoming matches:', error);
      return [];
    }
  };