import { FC } from 'react';

type Props = {
  imageSrc: string;
  value: string;
  description: string;
};

export const WeatherSpec: FC<Props> = ({ imageSrc, value, description }) => (
  <div className="weather--spec-item">
    <img src={imageSrc} className="w-20 h-20 mx-auto" />
    <div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-md text-stone-500">{description}</p>
    </div>
  </div>
);
