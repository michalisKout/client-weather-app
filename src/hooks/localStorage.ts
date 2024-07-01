import { FavoriteCityList } from '@/domain/models/city';
import { selectFavoriteCities, selectSearchHistory } from '@/domain/store/modules/user';
import { getFavoriteCitiesWeatherDataAsync } from '@/domain/store/modules/user/thunks';
import { useAppDispatch, useAppSelector } from '@/domain/store/store.types';
import { LocalStorageItems, getLocalStorageItem, setLocalStorageItem } from '@/utils/localStorage';
import { useEffect } from 'react';

export const useUpdateLocalStorageWithStoreData = () => {
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector(selectSearchHistory);
  const savedCities = useAppSelector(selectFavoriteCities);

  useEffect(() => {
    const favoriteCities = getLocalStorageItem<FavoriteCityList>(LocalStorageItems.favoriteCities);
    if (favoriteCities?.length) dispatch(getFavoriteCitiesWeatherDataAsync(favoriteCities));
  }, []);

  useEffect(() => {
    if (savedCities.length) setLocalStorageItem(LocalStorageItems.favoriteCities, savedCities);
  }, [savedCities]);

  useEffect(() => {
    if (searchHistory.length)
      setLocalStorageItem(LocalStorageItems.citiesSearchHistory, searchHistory);
  }, [searchHistory]);
};
