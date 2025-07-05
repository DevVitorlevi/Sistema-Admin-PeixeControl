import axios from 'axios';

const api = axios.create({
  baseURL: 'https://peixecontrol.onrender.com',
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
