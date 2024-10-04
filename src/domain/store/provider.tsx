import { setupStore } from './store';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

interface Props {
  readonly children: ReactNode;
}

const { store, persistor } = setupStore();

export const StoreProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
