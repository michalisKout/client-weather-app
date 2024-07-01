import { FallbackContent } from '@/components/fallbackContent';
import { CityInfoLoading } from '@/components/skeletons/skeletons';
import {
  addCityToFavoritesList,
  removeCityFromFavoritesList,
  selectFavoriteCities,
} from '@/domain/store/modules/user';
import {
  selectLocation,
  selectWeatherDataError,
  selectWeatherDataLoading,
  selectWeatherFavoriteCityData,
} from '@/domain/store/modules/weather';
import { useAppDispatch, useAppSelector } from '@/domain/store/store.types';
import HeartEmpty from '@/icons/heart-empty.svg';
import HeartFilled from '@/icons/heart.svg';
import { dateOptions, dayOptions, getDate } from '@/utils/dates';

export const CityInfo = () => {
  const locationData = useAppSelector(selectLocation);
  const isLoading = useAppSelector(selectWeatherDataLoading);
  const error = useAppSelector(selectWeatherDataError);
  const favoriteCity = useAppSelector(selectWeatherFavoriteCityData);
  const savedCities = useAppSelector(selectFavoriteCities);
  const dispatch = useAppDispatch();

  const cityAlreadyExists = !!savedCities.find(({ name }) => name === favoriteCity?.name);

  if (error)
    return (
      <FallbackContent text="Cannot display data due to an error." imgSrc="./server-error.svg" />
    );

  if (isLoading) return <CityInfoLoading />;

  if (!locationData)
    return (
      <FallbackContent
        text="The location details will be shown here."
        imgSrc="./city_location.svg"
      />
    );

  const day = getDate(locationData.localtime, dayOptions);
  const date = getDate(locationData.localtime, dateOptions);

  const handleFavoriteCity = () => {
    if (!favoriteCity) {
      alert('Please select a valid city!');
      return;
    }

    if (!cityAlreadyExists) dispatch(addCityToFavoritesList(favoriteCity));
    else dispatch(removeCityFromFavoritesList(favoriteCity.name));
  };

  return (
    <>
      <button
        aria-label="Favorite button"
        data-testid="favorite-city-button"
        className="favorite-city-button"
        onClick={handleFavoriteCity}
      >
        {cityAlreadyExists ? (
          <HeartFilled data-testid="heart-filled" />
        ) : (
          <HeartEmpty data-testid="heart-empty" />
        )}
      </button>

      <h2 className="text-4xl font-bold mb-6">{locationData?.name.trim()}</h2>
      {day && <p className="text-2xl italic">{day}</p>}
      {date && <p className="text-lg italic">{date}</p>}
    </>
  );
};
