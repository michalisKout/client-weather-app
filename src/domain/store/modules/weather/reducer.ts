import { getWeatherCurrentLocationAsync } from '@/domain/store/modules/weather/thunks';
import { WeatherState } from '@/domain/store/modules/weather/types';
import { createReducer } from '@reduxjs/toolkit';
const INITIAL_STATE: WeatherState = {
  loading: false,
};

export const weatherReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(getWeatherCurrentLocationAsync.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    })
    .addCase(getWeatherCurrentLocationAsync.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = undefined;
    })
    .addCase(getWeatherCurrentLocationAsync.rejected, (state, action) => {
      state.data = undefined;
      state.loading = false;
      state.error = action.error.message;
    })
    .addDefaultCase((state) => state);
});
