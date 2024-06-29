import { weatherReducer } from '@/domain/store/modules/weather';
import { RootState } from '@/domain/store/store.types';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

export const reducer = combineReducers({
  weather: weatherReducer,
});

const middlewares = import.meta.env.DEV ? [logger] : [];

export const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(middlewares);
    },
    devTools: import.meta.env.DEV,
    preloadedState,
  });
};
