import { RootState } from '@/domain/store/store.types';

export const selectLocation = (store: RootState) => store.weather.data?.location;

export const selectWeatherFavoriteCityData = (store: RootState) => {
  if (!store.weather.data) return;

  return {
    name: store.weather.data?.location.name,
    temp: store.weather.data?.current.temp_c,
    img: store.weather.data?.current.condition.icon,
    searchIndex: store.user.cityValue,
  };
};

export const selectDetails = (store: RootState) => store.weather.data?.current;

export const selectWeatherDataLoading = (store: RootState) => store.weather.loading;

export const selectWeatherDataInitLoading = (store: RootState) => store.weather.initLoading;

export const selectWeatherDataError = (store: RootState) => store.weather.error;
