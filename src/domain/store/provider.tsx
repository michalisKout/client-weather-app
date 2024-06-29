import { setupStore } from './store';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

interface Props {
  readonly children: ReactNode;
}

const store = setupStore();

export const StoreProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
