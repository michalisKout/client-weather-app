import { WeatherData } from '@/domain/models/weather';

export type WeatherState = {
  data?: WeatherData;
  error?: string;
  loading: boolean;
};
