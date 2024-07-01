import { FavoriteCityList } from '@/domain/models/city';
import {
  hydrateCitiesSearchHistory,
  selectFavoriteCities,
  selectSearchHistory,
  updateCityValue,
} from '@/domain/store/modules/user';
import { getFavoriteCitiesWeatherDataAsync } from '@/domain/store/modules/user/thunks';
import { useAppDispatch, useAppSelector } from '@/domain/store/store.types';
import { LocalStorageItems, getLocalStorageItem, setLocalStorageItem } from '@/utils/localStorage';
import { useEffect } from 'react';

export const useUpdateLocalStorageWithStoreData = () => {
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector(selectSearchHistory);
  const savedCities = useAppSelector(selectFavoriteCities);

  useEffect(() => {
    const savedSearchHistory = getLocalStorageItem<Array<string>>(
      LocalStorageItems.citiesSearchHistory,
    );

    const favoriteCities = getLocalStorageItem<FavoriteCityList>(LocalStorageItems.favoriteCities);
    const lastSavedFavoriteCity = favoriteCities?.[0];

    if (favoriteCities?.length) dispatch(getFavoriteCitiesWeatherDataAsync(favoriteCities));

    if (lastSavedFavoriteCity?.searchIndex)
      dispatch(updateCityValue(lastSavedFavoriteCity.searchIndex));

    if (savedSearchHistory) dispatch(hydrateCitiesSearchHistory(savedSearchHistory));
  }, []);

  useEffect(() => {
    if (savedCities) setLocalStorageItem(LocalStorageItems.favoriteCities, savedCities);
  }, [savedCities]);

  useEffect(() => {
    if (searchHistory.length)
      setLocalStorageItem(LocalStorageItems.citiesSearchHistory, searchHistory);
  }, [searchHistory]);
};
