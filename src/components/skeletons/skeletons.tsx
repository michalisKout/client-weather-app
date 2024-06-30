import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const highlightColor = '#0f172a'; // slate-900

export const WeatherSpecLoading = () => (
  <div className="p-4 flex-col-centered">
    <Skeleton width={80} height={80} highlightColor={highlightColor} />
    <Skeleton height={15} width={60} highlightColor={highlightColor} />
    <Skeleton height={10} width={60} highlightColor={highlightColor} />
  </div>
);

export const WeatherDetailsLoading = () => (
  <>
    <div className="flex-col-centered">
      <Skeleton width={180} height={40} highlightColor={highlightColor} />
      <Skeleton highlightColor={highlightColor} width={90} height={20} />
      <Skeleton highlightColor={highlightColor} circle width={100} height={100} />
      <Skeleton highlightColor={highlightColor} width={90} height={20} />
    </div>
    <div className="flex-col-centered my-6">
      <div className="flex flex-nowrap gap-4">
        <WeatherSpecLoading />
        <WeatherSpecLoading />
      </div>
      <div className="flex flex-nowrap gap-4">
        <WeatherSpecLoading />
        <WeatherSpecLoading />
      </div>
    </div>
  </>
);

export const CityInfoLoading = () => (
  <div className="flex flex-col gap-2 items-center">
    <Skeleton highlightColor={highlightColor} height={30} width={150} />
    <Skeleton height={20} className="mb-2" width={150} highlightColor={highlightColor} />
    <Skeleton width={150} highlightColor={highlightColor} />
  </div>
);
