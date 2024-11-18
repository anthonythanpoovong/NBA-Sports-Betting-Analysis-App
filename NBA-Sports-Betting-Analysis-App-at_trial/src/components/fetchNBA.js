import axios from 'axios';

const BASE_URL = 'https://api.balldontlie.io/v1';

// Ball Don't Lie API key
const API_KEY = process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY;

export const fetchUpcomingMatches = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        start_date: new Date().toISOString().split('T')[0], // Current date
        end_date: '2024-12-31', // End date for the query
        per_page: 2, // Fetch only 2 matches
        page: 1, // Pagination parameter
        timestamp: new Date().getTime() // Adding a timestamp to avoid caching issues
      },
      headers: {
        'Authorization': API_KEY
      }
    });
    console.log('API Response:', response); // Log the entire response object
    console.log('Upcoming Matches:', response.data.data); // Log the specific data field
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
};
