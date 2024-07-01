import { FavoriteCityList } from '@/domain/models/city';
import { BulkWeatherData, LocationParams, WeatherData } from '@/domain/models/weather';
import axiosInstance from '@/services/httpClient';
import { createLocationParams } from '@/services/utils';
import { WeatherApiParams } from '@/services/weatherApi.types';

export const getWeatherCurrentLocation = async (
  params?: WeatherApiParams,
): Promise<WeatherData> => {
  const data = await axiosInstance.get<WeatherData>(`current.json?q=${params?.city}`);

  return data.data;
};

export const getFavoriteCitiesWeatherData = async (
  favoriteCities: FavoriteCityList,
): Promise<FavoriteCityList> => {
  const params: LocationParams = createLocationParams(favoriteCities);
  const data = await axiosInstance.post<BulkWeatherData>(`current.json?q=bulk`, params);

  return data.data.bulk.map(({ query }) => ({
    searchIndex: query.q,
    name: query.location.name,
    temp: query.current.temp_c,
    img: query.current.condition.icon,
  }));
};
