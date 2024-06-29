import { WeatherData } from '@/domain/models/weather';
import axiosInstance from '@/services/httpClient';

export const getWeatherCurrentLocation = async (city?: string): Promise<WeatherData> => {
  console.log(city);
  const data = await axiosInstance.get<WeatherData>('current.json?q=Athens');

  return data.data;
};
