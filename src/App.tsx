import { getWeatherCurrentLocation } from '@/services/weatherApi';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const get = async () => {
      const data = await getWeatherCurrentLocation();
      console.log(data);
    };

    get();
  }, []);
  return (
    <>
      <h1 className="text-red-700 text-lg">Weather app</h1>
    </>
  );
}

export default App;
