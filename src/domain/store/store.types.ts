import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { reducer, setupStore } from './store';
import { useDispatch, useSelector, useStore } from 'react-redux';

export type RootState = ReturnType<typeof reducer>;

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
