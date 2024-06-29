import { WeatherData } from '@/domain/models/weather';
import axiosInstance from '@/services/httpClient';
import { WeatherApiParams } from '@/services/weatherApi.types';

export const getWeatherCurrentLocation = async (
  params?: WeatherApiParams,
): Promise<WeatherData> => {
  const data = await axiosInstance.get<WeatherData>(`current.json?q=${params?.city}`);

  return data.data;
};
