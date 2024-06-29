import {
  addCityToHistory,
  hydrateCitiesSearchHistory,
  updateCityValue,
} from '@/domain/store/modules/user/actions';
import { UserState } from '@/domain/store/modules/user/types';
import { createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE: UserState = {
  searchHistory: [],
};

export const userReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(updateCityValue, (state, action) => {
      state.cityValue = action.payload;
    })
    .addCase(addCityToHistory, (state, action) => {
      state.searchHistory?.unshift(action.payload);
    })
    .addCase(hydrateCitiesSearchHistory, (state, action) => {
      state.searchHistory = action.payload;
    })
    .addDefaultCase((state) => state);
});
