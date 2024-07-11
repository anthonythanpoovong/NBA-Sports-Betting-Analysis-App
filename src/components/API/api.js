import axios from 'axios';

const NEWS_API_KEY = 'YOUR_NEWS_API_KEY';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export const fetchNBAnews = async () => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: 'NBA',
        sortBy: 'publishedAt',
        apiKey: NEWS_API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching NBA news:', error);
    return [];
  }
};
