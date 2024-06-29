import { WEATHER_DATA_ACTIONS } from '@/domain/store/modules/weather/actions';
import { WeatherData } from '@/domain/models/weather';
import { getWeatherCurrentLocation } from '@/services/weatherApi';
import { WeatherApiParams } from '@/services/weatherApi.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getWeatherCurrentLocationAsync = createAsyncThunk<WeatherData, WeatherApiParams>(
  WEATHER_DATA_ACTIONS.GET_CURRENT_LOCATION,
  async ({ city }) => await getWeatherCurrentLocation({ city }),
);
