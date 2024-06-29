import { RootState } from '@/domain/store/store.types';

export const selectWeatherData = (store: RootState) => store.weather.data;
