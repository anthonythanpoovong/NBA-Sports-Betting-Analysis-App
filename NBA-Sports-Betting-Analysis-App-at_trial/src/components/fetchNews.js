// fetchNews.js
import axios from 'axios';


const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Replace with your News API key
const BASE_URL = 'https://newsapi.org/v2';


export const fetchNbaNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: 'NBA',
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





const API_KEY1 = process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY; // Ball Don't Lie API key

export const fetchUpcomingMatches = async () => {
  try {
    const response = await axios.get('/api/fetchUpcomingMatches', {
      params: {
        start_date: new Date().toISOString().split('T')[0],
        end_date: '2024-12-31',
        per_page: 10,
        timestamp: new Date().getTime() // Adding a timestamp to avoid caching issues
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
};

