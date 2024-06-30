import { FC } from 'react';

type Props = {
  imgSrc: string;
  text: string;
};

export const FallbackContent: FC<Props> = ({ imgSrc, text }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
      <img width={150} height={150} src={imgSrc} />
      <h2>{text}</h2>
    </div>
  );
};
