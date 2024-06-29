import { getWeatherCurrentLocationAsync } from '@/domain/store/modules/weather/thunks';
import { WeatherState } from '@/domain/store/modules/weather/types';
import { createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE: WeatherState = {
  loading: false,
};

export const weatherReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(getWeatherCurrentLocationAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addDefaultCase((state) => state);
});
