import { selectFavoriteCities, selectSearchHistory } from '@/domain/store/modules/user';
import { useAppSelector } from '@/domain/store/store.types';
import { LocalStorageItems, setLocalStorageItem, getLocalStorageItem } from '@/utils/localStorage';
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

export const useHydrateWithLocalStorageDataOnInit = <D>(
  itemName: LocalStorageItems,
  onValidDataRetrieval: (data: D) => void,
) => {
  useEffect(() => {
    const data = getLocalStorageItem<D>(itemName);
    if (data) onValidDataRetrieval(data);
  }, []);
};
