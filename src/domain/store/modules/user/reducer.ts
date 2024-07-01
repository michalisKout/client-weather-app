import {
  addCityToFavoritesList,
  addCityToHistory,
  hydrateCitiesSearchHistory,
  removeCityFromFavoritesList,
  updateCityValue,
} from '@/domain/store/modules/user/actions';
import { getFavoriteCitiesWeatherDataAsync } from '@/domain/store/modules/user/thunks';
import { UserState } from '@/domain/store/modules/user/types';
import { createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE: UserState = {
  searchHistory: [],
  favoriteCities: {
    loading: false,
    data: [],
  },
};

export const userReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(updateCityValue, (state, action) => {
      state.cityValue = action.payload;
    })
    .addCase(addCityToHistory, (state, action) => {
      const newHistory = state.searchHistory?.filter(
        (searchIndex) => searchIndex !== action.payload,
      );

      state.searchHistory = [action.payload, ...newHistory];
    })
    .addCase(hydrateCitiesSearchHistory, (state, action) => {
      state.searchHistory = action.payload;
    })
    .addCase(addCityToFavoritesList, (state, action) => {
      state.favoriteCities.data.unshift(action.payload);
    })
    .addCase(removeCityFromFavoritesList, (state, action) => {
      const updatedCities = state.favoriteCities.data.filter(
        (data) => data.name !== action.payload,
      );

      state.favoriteCities.data = updatedCities;
    })
    .addCase(getFavoriteCitiesWeatherDataAsync.pending, (state) => {
      state.favoriteCities.data = [];
      state.favoriteCities.loading = true;
      state.favoriteCities.error = undefined;
    })
    .addCase(getFavoriteCitiesWeatherDataAsync.fulfilled, (state, action) => {
      state.favoriteCities.data = action.payload;
      state.favoriteCities.loading = false;
      state.favoriteCities.error = undefined;
    })
    .addCase(getFavoriteCitiesWeatherDataAsync.rejected, (state, action) => {
      state.favoriteCities.data = [];
      state.favoriteCities.loading = false;
      if (action.payload) state.favoriteCities.error = action.payload as string;
    })
    .addDefaultCase((state) => state);
});
