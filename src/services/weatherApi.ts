import { WeatherData } from '@/domain/models/weather';
import axiosInstance from '@/services/httpClient';
import { WeatherApiParams } from '@/services/weatherApi.types';

export const getWeatherCurrentLocation = async (
  params?: WeatherApiParams,
): Promise<WeatherData> => {
  console.log(params?.city);
  const data = await axiosInstance.get<WeatherData>('current.json?q=Athens');

  return data.data;
};
