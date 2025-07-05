import axios from 'axios';

const api = axios.create({
  baseURL: 'https://peixecontrol.onrender.com',
});

export default api;
