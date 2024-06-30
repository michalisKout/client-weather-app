import { FC } from 'react';

type Props = {
  imageSrc: string;
  value: string;
  description: string;
};

export const WeatherSpec: FC<Props> = ({ imageSrc, value, description }) => (
  <div className="weather__spec-item">
    <img src={imageSrc} className="w-12 h-12 mx-auto" alt={description} />
    <div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-md text-stone-400">{description}</p>
    </div>
  </div>
);
