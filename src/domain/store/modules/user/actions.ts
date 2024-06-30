import { FavoriteCity, FavoriteCityList } from '@/domain/models/city';
import { createAction } from '@reduxjs/toolkit';

export enum USER_ACTIONS {
  UPDATE_CITY_VALUE = 'UPDATE_CITY_VALUE',
  ADD_CITY_VALUE_TO_HISTORY = 'ADD_CITY_VALUE_TO_HISTORY',
  HYDRATE_CITIES_SEARCH_HISTORY = 'HYDRATE_CITIES_SEARCH_HISTORY',
  HYDRATE_FAVORITE_CITIES = 'HYDRATE_FAVORITE_CITIES',
  RESET_CITY_VALUE = 'RESET_CITY_VALUE',
  ADD_CITY_FAVORITES_LIST = 'ADD_CITY_FAVORITES_LIST',
  REMOVE_CITY_FROM_FAVORITES_LIST = 'REMOVE_CITY_FROM_FAVORITES_LIST',
}

type CityName = string;

export const updateCityValue = createAction<string>(USER_ACTIONS.UPDATE_CITY_VALUE);

export const addCityToHistory = createAction<string>(USER_ACTIONS.ADD_CITY_VALUE_TO_HISTORY);

export const hydrateCitiesSearchHistory = createAction<Array<string>>(
  USER_ACTIONS.HYDRATE_CITIES_SEARCH_HISTORY,
);
export const hydrateFavoriteCities = createAction<FavoriteCityList>(
  USER_ACTIONS.HYDRATE_FAVORITE_CITIES,
);

export const addCityToFavoritesList = createAction<FavoriteCity>(
  USER_ACTIONS.ADD_CITY_FAVORITES_LIST,
);

export const removeCityFromFavoritesList = createAction<CityName>(
  USER_ACTIONS.REMOVE_CITY_FROM_FAVORITES_LIST,
);
export const resetCityValue = createAction(USER_ACTIONS.RESET_CITY_VALUE);
