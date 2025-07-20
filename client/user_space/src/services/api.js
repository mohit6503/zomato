import axios from 'axios';

const api = axios.create({
  baseURL: 'https://zomato-3cc5.vercel.app/',
});

export default api;
