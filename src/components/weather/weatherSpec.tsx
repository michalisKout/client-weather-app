import { FC } from 'react';

type Props = {
  imageSrc: string;
  value: string;
  description: string;
};

export const WeatherSpec: FC<Props> = ({ imageSrc, value, description }) => (
  <div className="weather--spec-item">
    <img src={imageSrc} className="w-8 h-8 mx-auto" />
    <div>
      <p className="text-sm font-bold">{value}</p>
      <p className="text-sm text-stone-500">{description}</p>
    </div>
  </div>
);
