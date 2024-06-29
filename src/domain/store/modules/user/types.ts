import { FavoriteCity } from '@/domain/models/city';

export type UserState = {
  cityValue?: string;
  searchHistory: Array<string>;
  favoriteCities: Array<FavoriteCity>;
};
