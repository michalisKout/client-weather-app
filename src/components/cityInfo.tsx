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

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
};

export const CityInfo = () => {
  const locationData = useAppSelector(selectLocation);
  const isLoading = useAppSelector(selectWeatherDataLoading);
  const error = useAppSelector(selectWeatherDataError);
  const favoriteCity = useAppSelector(selectWeatherFavoriteCityData);
  const savedCities = useAppSelector(selectFavoriteCities);
  const dispatch = useAppDispatch();

  if (error) return <p>Cannot display data due to an error.</p>;

  if (isLoading) return <CityInfoLoading />;

  if (!locationData)
    return (
      <FallbackContent
        text="The location details will be shown here."
        imgSrc="./city_location.svg"
      />
    );

  const time = locationData?.localtime && new Date(locationData?.localtime).toLocaleTimeString();

  const date =
    locationData?.localtime &&
    new Date(locationData?.localtime).toLocaleDateString('en-US', dateOptions);

  const cityAlreadyExists = !!savedCities.find(({ name }) => name === favoriteCity?.name);

  return (
    <>
      <button
        data-testid="favorite-city-button"
        className="favorite-city-button"
        onClick={() => {
          if (!favoriteCity) {
            alert('Please select a valid city!');
            return;
          }

          if (!cityAlreadyExists) dispatch(addCityToFavoritesList(favoriteCity));
          else dispatch(removeCityFromFavoritesList(favoriteCity.name));
        }}
      >
        {cityAlreadyExists ? (
          <HeartFilled data-testid="heart-filled" />
        ) : (
          <HeartEmpty data-testid="heart-empty" />
        )}
      </button>

      <h2 className="text-4xl font-bold">{locationData?.name.trim()}</h2>
      <p className="text-2xl italic">{time}</p>
      <p className="text-lg italic">{date}</p>
    </>
  );
};
