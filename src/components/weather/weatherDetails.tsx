import { WeatherSpec } from '@/components/weather/weatherSpec';
import { selectDetails, selectWeatherDataLoading } from '@/domain/store/modules/weather';
import { useAppSelector } from '@/domain/store/store.types';
import icons from '@/icons';
import { FC } from 'react';

type Props = {
  test?: string;
};

export const WeatherDetails: FC<Props> = () => {
  const details = useAppSelector(selectDetails);
  const isLoading = useAppSelector(selectWeatherDataLoading);

  if (isLoading) return <p>Loading weather details...</p>;
  if (!details) return <p>Missing weather details</p>;

  const weatherConditionBgClass = details?.is_day ? 'bg-gray-200' : 'bg-gray-700';

  return (
    <>
      <div className="text-center">
        <h2 className="text-6xl font-bold">{details.temp_c} °C</h2>
        <p className="text-md">Feels like {details.feelslike_c} °C</p>
        <img
          src={details.condition.icon}
          className={`weather--condition ${weatherConditionBgClass}`}
        />
        <p className="text-2xl">{details.condition.text}</p>
      </div>
      <div className="weather--specs-container">
        <WeatherSpec
          imageSrc={icons.humidity}
          value={`${details?.humidity}%`}
          description="Humidity"
        />
        <WeatherSpec
          imageSrc={icons.wind}
          value={`${details?.wind_kph} km/h`}
          description="Wind speed"
        />
        <WeatherSpec
          imageSrc={icons.preasure}
          value={`${details?.pressure_mb} mb`}
          description="Pressure"
        />
        <WeatherSpec imageSrc={icons.uv} value={details?.uv.toString()} description="UV" />
      </div>
    </>
  );
};
