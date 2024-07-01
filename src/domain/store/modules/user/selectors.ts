import { RootState } from '@/domain/store/store.types';

export const selectCityInput = (store: RootState) => store.user.cityValue;

export const selectSearchHistory = (store: RootState) => store.user.searchHistory;

export const selectFavoriteCities = (store: RootState) => store.user.favoriteCities.data;

export const selectFavoriteCitiesLoading = (store: RootState) => store.user.favoriteCities.loading;

export const selectFavoriteCitiesError = (store: RootState) => store.user.favoriteCities.error;
