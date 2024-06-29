import { createAction } from '@reduxjs/toolkit';

export enum WEATHER_DATA_ACTIONS {
  GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION',
  RESET_DATA = 'RESET_DATA',
  RESET_ERROR = 'RESET_ERROR',
}

export const resetWeatherData = createAction(WEATHER_DATA_ACTIONS.RESET_DATA);

export const resetWeatherDataError = createAction(WEATHER_DATA_ACTIONS.RESET_ERROR);
