import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const weatherApi = {
  getAllWeather: async () => {
    const response = await api.get('/weather/all');
    return response.data;
  },
  
  getCityWeather: async (cityCode) => {
    const response = await api.get(`/weather/${cityCode}`);
    return response.data;
  },
  
  getCities: async () => {
    const response = await api.get('/weather/cities');
    return response.data;
  }
};

export default api;