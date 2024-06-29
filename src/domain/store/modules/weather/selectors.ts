import { RootState } from '@/domain/store/store.types';

export const selectLocation = (store: RootState) => store.weather.data?.location;

export const selectWeatherDataLoading = (store: RootState) => store.weather.loading;

export const selectWeatherDataError = (store: RootState) => store.weather.error;
