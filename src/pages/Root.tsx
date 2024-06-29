import { Card } from '@/components/card';
import { CityInfo } from '@/components/cityInfo';
import { WeatherDetails } from '@/components/weather/weatherDetails';
import { getWeatherCurrentLocationAsync } from '@/domain/store/modules/weather';
import { AppDispatch } from '@/domain/store/store.types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Root() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getWeatherCurrentLocationAsync({ city: 'Athens' }));
  }, []);

  return (
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
  );
}

export default Root;
