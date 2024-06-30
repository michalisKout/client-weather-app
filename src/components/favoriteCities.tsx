import { FavoriteCity } from '@/domain/models/city';
import {
  hydrateFavoriteCities,
  removeCityFromFavoritesList,
  selectFavoriteCities,
  updateCityValue,
} from '@/domain/store/modules/user';
import { useAppDispatch, useAppSelector } from '@/domain/store/store.types';
import DeleteIcon from '@/icons/delete.svg';
import { useEffect } from 'react';

export const FavoriteCities = () => {
  const cities = useAppSelector(selectFavoriteCities);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const favoriteCities = localStorage.getItem('favoriteCities');

    if (favoriteCities) dispatch(hydrateFavoriteCities(JSON.parse(favoriteCities)));
  }, []);

  if (!cities?.length)
    return (
      <div>
        <h2 className="text-2xl font-bold">Your favorite cities list is empty!</h2>
        <p> Start adding cities by pressing ❤ button.</p>
      </div>
    );

  return (
    <>
      <h2>Favorite cities</h2>
      <ul className="max-h-64 overflow-auto px-6">
        {cities?.map(({ name, temp, img, searchIndex }, index) => (
          <li
            key={name + index}
            data-testid={`fav-city-${name}-${index}`}
            className="flex flex-nowrap justify-between gap-2 items-center"
          >
            <img src={img} alt={name} />
            <button
              className="text-md font-bold hover:underline whitespace-nowrap text-ellipsis overflow-hidden"
              onClick={() => {
                if (searchIndex) dispatch(updateCityValue(searchIndex));
              }}
            >
              <span>{name}</span>
            </button>
            <strong>{temp}°C</strong>
            <button
              data-testid={`fav-city-${name}-${index}-remove`}
              className="hover:scale-105 active:scale-95 transition-all"
              onClick={() => {
                dispatch(removeCityFromFavoritesList(name));

                const favoriteCities = localStorage.getItem('favoriteCities');
                const parsedCities = favoriteCities
                  ? (JSON.parse(favoriteCities) as Array<FavoriteCity>)
                  : [];
                const updatedCities = parsedCities?.filter((city) => city.name !== name);

                localStorage.setItem('favoriteCities', JSON.stringify(updatedCities));
              }}
            >
              <DeleteIcon />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
