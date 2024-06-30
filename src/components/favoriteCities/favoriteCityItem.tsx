import { FavoriteCity } from '@/domain/models/city';
import { selectCityInput, updateCityValue } from '@/domain/store/modules/user';
import { useAppDispatch, useAppSelector } from '@/domain/store/store.types';
import { FC } from 'react';
import DeleteIcon from '@/icons/delete.svg';

type Props = {
  city: FavoriteCity;
  index: number;
  handleCityRemoval?: (city: FavoriteCity) => void;
};

export const FavoriteCityItem: FC<Props> = ({ handleCityRemoval, city, index }) => {
  const searchInput = useAppSelector(selectCityInput);
  const { name, temp, img, searchIndex } = city;
  const dispatch = useAppDispatch();

  const handleCityClick = () => {
    if (searchIndex) dispatch(updateCityValue(searchIndex));
  };

  const selectedStyle =
    searchInput === city.searchIndex ? 'transition-colors bg-slate-800 rounded-md' : '';

  return (
    <li
      onClick={(e) => {
        e.stopPropagation();
        handleCityClick();
      }}
      key={name + index}
      data-testid={`fav-city-${name}-${index}`}
      className={`favorite-cities__item ${selectedStyle}`}
    >
      <img src={img} alt={name} />
      <p className="truncate">{name}</p>
      <strong>{temp}°C</strong>
      {handleCityRemoval && (
        <button
          data-testid={`fav-city-${name}-${index}-remove`}
          className="hover:scale-105 active:scale-95 transition-all mr-4"
          onClick={() => {
            handleCityRemoval(city);
          }}
        >
          <DeleteIcon />
        </button>
      )}
    </li>
  );
};
