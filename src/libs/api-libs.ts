import axios from 'axios';

const API_BASE_URL = 'https://api.jikan.moe/v4/anime';

export const getAllAnime = async () => {
  const response = await axios.get(API_BASE_URL);
  return response;
};
