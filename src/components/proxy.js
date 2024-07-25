// pages/api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://www.balldontlie.io/api/v1/games', {
      params: req.query, // Forward query parameters
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
