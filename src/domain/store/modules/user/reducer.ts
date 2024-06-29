import {
  addCityToFavoritesList,
  addCityToHistory,
  hydrateCitiesSearchHistory,
  hydrateFavoriteCities,
  removeCityFromFavoritesList,
  updateCityValue,
} from '@/domain/store/modules/user/actions';
import { UserState } from '@/domain/store/modules/user/types';
import { createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE: UserState = {
  searchHistory: [],
  favoriteCities: [],
};

export const userReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(updateCityValue, (state, action) => {
      state.cityValue = action.payload;
    })
    .addCase(addCityToHistory, (state, action) => {
      state.searchHistory?.unshift(action.payload);
    })
    .addCase(hydrateCitiesSearchHistory, (state, action) => {
      state.searchHistory = action.payload;
    })
    .addCase(addCityToFavoritesList, (state, action) => {
      state.favoriteCities.unshift(action.payload);
    })
    .addCase(hydrateFavoriteCities, (state, action) => {
      state.favoriteCities = action.payload;
    })
    .addCase(removeCityFromFavoritesList, (state, action) => {
      const updatedCities = state.favoriteCities.filter((data) => data.name !== action.payload);

      state.favoriteCities = updatedCities;
    })
    .addDefaultCase((state) => state);
});
