import { resetWeatherData, resetWeatherDataError } from '@/domain/store/modules/weather/actions';
import { getWeatherCurrentLocationAsync } from '@/domain/store/modules/weather/thunks';
import { WeatherState } from '@/domain/store/modules/weather/types';
import { createReducer } from '@reduxjs/toolkit';
const INITIAL_STATE: WeatherState = {
  loading: false,
  initLoading: false,
};

export const weatherReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(getWeatherCurrentLocationAsync.pending, (state) => {
      state.loading = true;
      if (!state.data) state.initLoading = true;
      state.error = undefined;
    })
    .addCase(getWeatherCurrentLocationAsync.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = undefined;
      state.initLoading = false;
    })
    .addCase(getWeatherCurrentLocationAsync.rejected, (state, action) => {
      state.data = undefined;
      state.loading = false;
      state.initLoading = false;
      if (action.payload) state.error = action.payload as string;
    })
    .addCase(resetWeatherDataError, (state) => {
      state.error = undefined;
    })
    .addCase(resetWeatherData, (state) => {
      state.data = undefined;
    })
    .addDefaultCase((state) => state);
});
