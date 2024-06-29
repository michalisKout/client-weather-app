import { Card } from '@/components/card';
import { CityInfo } from '@/components/cityInfo';
import { SearchCityInput } from '@/components/searchCityInput';
import { WeatherDetails } from '@/components/weather/weatherDetails';
import { selectCityInput } from '@/domain/store/modules/user';
import { getWeatherCurrentLocationAsync } from '@/domain/store/modules/weather';
import { AppDispatch, useAppSelector } from '@/domain/store/store.types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Root() {
  const dispatch = useDispatch<AppDispatch>();
  const city = useAppSelector(selectCityInput);

  useEffect(() => {
    if (city) dispatch(getWeatherCurrentLocationAsync({ city }));
  }, [city, dispatch]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <SearchCityInput />

      {city && (
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CityInfo />
          </Card>
          <Card>
            <WeatherDetails />
          </Card>
          <Card>
            <div>Weather data</div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Root;
