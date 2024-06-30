import { FavoriteCityItem } from '@/components/favoriteCities/favoriteCityItem';
import { FavoriteCity, FavoriteCityList } from '@/domain/models/city';
import {
  selectFavoriteCities,
  hydrateFavoriteCities,
  removeCityFromFavoritesList,
} from '@/domain/store/modules/user';
import { useAppSelector, useAppDispatch } from '@/domain/store/store.types';
import { getLocalStorageItem, LocalStorageItems, setLocalStorageItem } from '@/utils/localStorage';
import { useEffect, useCallback } from 'react';

export const FavoriteCities = () => {
  const cities = useAppSelector(selectFavoriteCities);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const favoriteCities = getLocalStorageItem<FavoriteCityList>(LocalStorageItems.favoriteCities);

    if (favoriteCities) dispatch(hydrateFavoriteCities(favoriteCities));
  }, []);

  const handleCityRemove = useCallback(
    ({ name }: FavoriteCity) => {
      dispatch(removeCityFromFavoritesList(name));

      const favoriteCities = getLocalStorageItem<FavoriteCityList>(
        LocalStorageItems.favoriteCities,
      );
      const updatedCities = favoriteCities?.filter((city) => city.name !== name);

      setLocalStorageItem(LocalStorageItems.favoriteCities, updatedCities || [].toString());
    },
    [dispatch],
  );

  if (!cities?.length) return <FavoriteCitiesFallback />;

  return (
    <>
      <h2>Favorite cities</h2>
      <ul className="max-h-64 overflow-auto px-6">
        {cities?.map((city, index) => (
          <FavoriteCityItem
            key={`${city.name}_${index}`}
            index={index}
            city={city}
            handleCityRemoval={handleCityRemove}
          />
        ))}
      </ul>
    </>
  );
};

function FavoriteCitiesFallback() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Your favorite cities list is empty!</h2>
      <p> Start adding cities by pressing ❤ button.</p>
    </div>
  );
}
