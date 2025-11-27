import axios from 'axios';

const TOKEN_KEY = 'authToken';

const api = axios.create({
  baseURL: 'https://localhost:7206/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;