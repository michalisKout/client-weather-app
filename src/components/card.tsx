import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Card: FC<Props> = ({ children }) => <section className="card">{children}</section>;
