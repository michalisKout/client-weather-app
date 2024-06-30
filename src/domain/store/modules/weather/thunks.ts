import { WEATHER_DATA_ACTIONS } from '@/domain/store/modules/weather/actions';
import { WeatherData } from '@/domain/models/weather';
import { getWeatherCurrentLocation } from '@/services/weatherApi';
import { WeatherApiParams } from '@/services/weatherApi.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiErrorResponse } from '@/services/httpClient';

export const getWeatherCurrentLocationAsync = createAsyncThunk<WeatherData, WeatherApiParams>(
  WEATHER_DATA_ACTIONS.GET_CURRENT_LOCATION,
  async ({ city }, thunkApi) => {
    try {
      const data = await getWeatherCurrentLocation({ city });
      return data;
    } catch (err) {
      const error = err as ApiErrorResponse & { errCode: string };

      return thunkApi.rejectWithValue(error.error.message);
    }
  },
);
