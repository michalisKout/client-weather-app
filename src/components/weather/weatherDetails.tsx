import { WeatherDetailsLoading } from '@/components/skeletons/skeletons';
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

  if (isLoading) return <WeatherDetailsLoading />;
  if (!details) return <p>Missing weather details</p>;

  const weatherConditionBgClass = details?.is_day ? 'day' : 'night';

  return (
    <>
      <div className="flex-col-centered">
        <h2 className="text-6xl font-bold">{details.temp_c} °C</h2>
        <p className="text-md">Feels like {details.feelslike_c} °C</p>
        <img
          alt="weather condition"
          src={details.condition.icon}
          className={`weather__condition weather__condition__${weatherConditionBgClass}`}
        />
        <p className="text-2xl">{details.condition.text}</p>
      </div>
      <div className="weather__specs-container">
        <div className="weather__specs-row">
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
        </div>
        <div className="weather__specs-row">
          <WeatherSpec
            imageSrc={icons.preasure}
            value={`${details?.pressure_mb} mb`}
            description="Pressure"
          />
          <WeatherSpec imageSrc={icons.uv} value={details?.uv.toString()} description="UV" />
        </div>
      </div>
    </>
  );
};
