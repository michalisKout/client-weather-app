import { Card } from '@/components/card';
import { CityInfo } from '@/components/cityInfo';
import { FavoriteCities } from '@/components/favoriteCities/favoriteCities';
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
          <div className="flex-col-centered gap-4">
            <Card>
              <CityInfo />
            </Card>
            <div className="hidden md:block">
              <Card>
                <FavoriteCities />
              </Card>
            </div>
          </div>
          <div className="flex-col-centered w-full h-full">
            <Card>
              <WeatherDetails />
            </Card>

            <div className="md:hidden block">
              <Card>
                <FavoriteCities />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Root;
