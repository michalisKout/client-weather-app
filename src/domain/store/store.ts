import { userReducer } from '@/domain/store/modules/user';
import { weatherReducer } from '@/domain/store/modules/weather';
import { RootState } from '@/domain/store/store.types';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'user',
  storage,
};

export const reducer = combineReducers({
  weather: weatherReducer,
  user: persistReducer(persistConfig, userReducer),
});

const middlewares = import.meta.env.DEV ? [logger] : [];

export const setupStore = (preloadedState?: RootState & PersistPartial) => {
  const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(middlewares);
    },
    devTools: import.meta.env.DEV,
    preloadedState,
  });

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};
