import { FavoriteCityList } from '@/domain/models/city';
import { LocationParams } from '@/domain/models/weather';

export const createLocationParams = (favoriteCities: FavoriteCityList): LocationParams => ({
  locations: favoriteCities.map((city) => ({ q: city.searchIndex })),
});
