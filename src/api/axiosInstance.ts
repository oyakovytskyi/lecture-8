import axios from 'axios';
import { history } from '../navigate';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      localStorage.removeItem('token');
      history.push('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
