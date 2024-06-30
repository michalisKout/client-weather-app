import { setupStore } from '@/domain/store/store';
import { RootState } from '@/domain/store/store.types';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

export const MockStoreProvider: FC<{
  children: ReactNode;
  preloadState?: RootState;
}> = ({ children, preloadState }) => {
  const mockStore = setupStore(preloadState);

  return <Provider store={mockStore}>{children}</Provider>;
};
