import { handleApiErrorMessage } from '@/utils/errorHandling';
import axios, { AxiosError } from 'axios';

const API_VERSION = 'v1';
const DEFAULT_URL = `https://api.weatherapi.com/`;

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    console.log({ error });
    return Promise.reject({
      errCode: error.code,
      error: {
        code: error.response?.data.error.code,
        message: handleApiErrorMessage(error),
      },
    });
  },
);

export default axiosInstance;

export type ApiErrorResponse = { error: { code: number; message: string } };

export type ClientError = ApiErrorResponse & { errCode: string };
