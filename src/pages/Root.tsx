import { Card } from '@/components/card';
import { CityInfo } from '@/components/cityInfo';
import { FavoriteCities } from '@/components/favoriteCities';
import { SearchCityInput } from '@/components/searchCityInput/searchCityInput';
import { WeatherDetails } from '@/components/weather/weatherDetails';
import { selectCityInput } from '@/domain/store/modules/user';
import { getWeatherCurrentLocationAsync } from '@/domain/store/modules/weather';
import { AppDispatch, useAppSelector } from '@/domain/store/store.types';
import { useUpdateLocalStorageWithStoreData } from '@/hooks/localStorage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Root() {
  const dispatch = useDispatch<AppDispatch>();
  const city = useAppSelector(selectCityInput);

  useUpdateLocalStorageWithStoreData();

  useEffect(() => {
    if (city) dispatch(getWeatherCurrentLocationAsync({ city }));
  }, [city, dispatch]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <SearchCityInput />

      <div className="flex w-full justify-center" style={{ maxWidth: 800 }}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid grid-rows-2 gap-4">
            <Card>
              <FavoriteCities />
            </Card>
            {city && (
              <Card>
                <CityInfo />
              </Card>
            )}
          </div>
          <div className="flex w-full">
            {city && (
              <Card>
                <WeatherDetails />
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Root;
