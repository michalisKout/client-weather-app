import { FavoriteCityList } from '@/domain/models/city';
import { USER_ACTIONS } from '@/domain/store/modules/user/actions';
import { ApiErrorResponse } from '@/services/httpClient';
import { getFavoriteCitiesWeatherData } from '@/services/weatherApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFavoriteCitiesWeatherDataAsync = createAsyncThunk<
  FavoriteCityList,
  FavoriteCityList
>(USER_ACTIONS.UPDATE_FAVORITES_LIST, async (cities, thunkApi) => {
  try {
    return await getFavoriteCitiesWeatherData(cities);
  } catch (err) {
    const error = err as ApiErrorResponse & { errCode: string };

    console.log(error);
    return thunkApi.rejectWithValue(error.error.message);
  }
});
