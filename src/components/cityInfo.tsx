import { selectLocation, selectWeatherDataLoading } from '@/domain/store/modules/weather';
import { useAppSelector } from '@/domain/store/store.types';

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
};

export const CityInfo = () => {
  const locationData = useAppSelector(selectLocation);
  const isLoading = useAppSelector(selectWeatherDataLoading);

  if (isLoading) return <p>loading location details...</p>;

  const time = locationData?.localtime && new Date(locationData?.localtime).toLocaleTimeString();

  const date =
    locationData?.localtime &&
    new Date(locationData?.localtime).toLocaleDateString('en-US', dateOptions);

  return (
    <>
      <h2 className="text-6xl font-bold mb-20">{locationData?.name.trim()}</h2>
      <p className="text-2xl italic">{time}</p>
      <p className="text-lg italic">{date}</p>
    </>
  );
};