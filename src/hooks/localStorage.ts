import { selectFavoriteCities, selectSearchHistory } from '@/domain/store/modules/user';
import { useAppSelector } from '@/domain/store/store.types';
import { LocalStorageItems, setLocalStorageItem } from '@/utils/localStorage';
import { useEffect } from 'react';

export const useUpdateLocalStorageWithStoreData = () => {
  const searchHistory = useAppSelector(selectSearchHistory);
  const savedCities = useAppSelector(selectFavoriteCities);

  useEffect(() => {
    if (savedCities.length) setLocalStorageItem(LocalStorageItems.favoriteCities, savedCities);
  }, [savedCities]);

  useEffect(() => {
    if (searchHistory.length)
      setLocalStorageItem(LocalStorageItems.citiesSearchHistory, searchHistory);
  }, [searchHistory]);
};
