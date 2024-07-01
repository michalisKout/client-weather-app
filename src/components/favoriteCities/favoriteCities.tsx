import { FallbackContent } from '@/components/fallbackContent';
import { FavoriteCityItem } from '@/components/favoriteCities/favoriteCityItem';
import { FavoriteCitiesLoading } from '@/components/skeletons/skeletons';
import { FavoriteCity, FavoriteCityList } from '@/domain/models/city';
import {
  selectFavoriteCities,
  removeCityFromFavoritesList,
  selectFavoriteCitiesLoading,
  selectFavoriteCitiesError,
} from '@/domain/store/modules/user';
import { useAppSelector, useAppDispatch } from '@/domain/store/store.types';
import { getLocalStorageItem, LocalStorageItems, setLocalStorageItem } from '@/utils/localStorage';
import { useCallback } from 'react';

export const FavoriteCities = () => {
  const cities = useAppSelector(selectFavoriteCities);
  const isLoading = useAppSelector(selectFavoriteCitiesLoading);
  const error = useAppSelector(selectFavoriteCitiesError);
  const dispatch = useAppDispatch();

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

  if (isLoading) return <FavoriteCitiesLoading />;

  if (error) return <FallbackContent text={error} imgSrc="./server-error.svg" />;

  if (!cities?.length) return <FavoriteCitiesFallback />;

  return (
    <>
      <h2>Favorite cities</h2>
      <ul className="favorite-cities__list">
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
