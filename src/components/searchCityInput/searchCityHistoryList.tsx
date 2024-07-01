import { hydrateCitiesSearchHistory } from '@/domain/store/modules/user';
import { useAppDispatch } from '@/domain/store/store.types';
import { LocalStorageItems, setLocalStorageItem } from '@/utils/localStorage';
import { FC, useMemo } from 'react';

type Props = {
  searchHistory: Array<string>;
  onHistoryItemClick?: (city: string) => void;
  searchInput: string;
};

export const SearchCityHistoryList: FC<Props> = ({
  searchHistory,
  onHistoryItemClick,
  searchInput,
}) => {
  const dispatch = useAppDispatch();

  const handleClearHistory = () => {
    const yes = confirm('Are you sure you want to clear your search history?');
    if (yes) {
      dispatch(hydrateCitiesSearchHistory([]));
      setLocalStorageItem(LocalStorageItems.citiesSearchHistory, []);
    }
  };

  const searchesExistsInHistory = useMemo(
    () =>
      searchHistory.filter((city) =>
        city.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()),
      ),
    [searchHistory, searchInput],
  );

  if (!searchesExistsInHistory.length) return null;

  return (
    <div className="search-history__container">
      <ul className="search-history__list">
        <div className="flex justify-between p-2">
          <p className="italic">Recent searched cities</p>
          <button className="italic hover:underline text-red-800" onClick={handleClearHistory}>
            Clear history
          </button>
        </div>

        {searchesExistsInHistory.map((city, index) => {
          return (
            <li
              tabIndex={0}
              key={city + index}
              className="search-history__item"
              onClick={() => {
                onHistoryItemClick?.(city);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onHistoryItemClick?.(city);
              }}
            >
              {city}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
