import { RootState } from '@/domain/store/store.types';

export const selectCityInput = (store: RootState) => store.user.cityValue;

export const selectSearchHistory = (store: RootState) => store.user.searchHistory;
