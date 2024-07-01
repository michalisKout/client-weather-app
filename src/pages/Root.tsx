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
    <>
      <header className="w-full text-center">
        <h1 className="font-bold text-3xl md:text-6xl mb-6">Weather app</h1>
      </header>
      <main className="flex flex-col gap-4 items-center">
        <SearchCityInput />

        <div className="flex w-full justify-center" style={{ maxWidth: 800 }}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex-col-centered gap-4">
              <Card>
                <CityInfo />
              </Card>

              <Card>
                <FavoriteCities />
              </Card>
            </div>
            <div className="flex-col-centered w-full h-full">
              <Card>
                <WeatherDetails />
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full text-center mt-6">
        <p className="font-bold text-lg italic">
          Created by{' '}
          <a
            className="text-slate-500 hover:underline"
            href="https://mikek.gr"
            target="_blank"
            rel="noreferrer"
          >
            Michael Koutridis
          </a>
        </p>
      </footer>
    </>
  );
}

export default Root;
