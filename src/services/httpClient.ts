import axios from 'axios';

const API_VERSION = 'v1';
const DEFAULT_URL = `http://api.weatherapi.com/`;

const createBaseUrl = () => `${import.meta.env.VITE_BASE_URL || DEFAULT_URL}${API_VERSION}/`;

const axiosInstance = axios.create({
  baseURL: createBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: import.meta.env.VITE_WEATHER_API_KEY,
  },
});

export default axiosInstance;

export type ApiErrorResponse = { error: { code: number; message: string } };
