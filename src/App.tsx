import { getWeatherCurrentLocationAsync } from '@/domain/store/modules/weather';
import { AppDispatch, useAppSelector } from '@/domain/store/store.types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const weatherData = useAppSelector((store) => store.weather.data);

  useEffect(() => {
    dispatch(getWeatherCurrentLocationAsync({ city: 'Athens' }));
  }, []);

  return (
    <>
      <h1 className="text-red-700 text-lg">Weather app</h1>
      {weatherData?.location.country}
    </>
  );
}

export default App;
