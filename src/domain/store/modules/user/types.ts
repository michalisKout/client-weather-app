import { FavoriteCityList } from '@/domain/models/city';

export type UserState = {
  cityValue?: string;
  searchHistory: Array<string>;
  favoriteCities: FavoriteCityList;
};
