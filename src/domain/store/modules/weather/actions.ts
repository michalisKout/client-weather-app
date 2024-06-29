import { createAction } from '@reduxjs/toolkit';

export enum WEATHER_DATA_ACTIONS {
  GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION',
  RESET_CURRENT_LOCATION = 'RESET_CURRENT_LOCATION',
}

export const resetWeatherCurrentLocation = createAction(
  WEATHER_DATA_ACTIONS.RESET_CURRENT_LOCATION,
);
