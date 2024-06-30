import { FavoriteCity } from '@/domain/models/city';
import { updateCityValue } from '@/domain/store/modules/user';
import { useAppDispatch } from '@/domain/store/store.types';
import { FC } from 'react';
import DeleteIcon from '@/icons/delete.svg';

type Props = {
  city: FavoriteCity;
  index: number;
  handleCityRemoval?: (city: FavoriteCity) => void;
};

export const FavoriteCityItem: FC<Props> = ({ handleCityRemoval, city, index }) => {
  const { name, temp, img, searchIndex } = city;
  const dispatch = useAppDispatch();

  return (
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
      {handleCityRemoval && (
        <button
          data-testid={`fav-city-${name}-${index}-remove`}
          className="hover:scale-105 active:scale-95 transition-all"
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
