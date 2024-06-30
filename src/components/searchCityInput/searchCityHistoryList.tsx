import { hydrateCitiesSearchHistory } from '@/domain/store/modules/user';
import { useAppDispatch } from '@/domain/store/store.types';
import { LocalStorageItems, setLocalStorageItem } from '@/utils/localStorage';
import { FC } from 'react';

type Props = {
  searchHistory: Array<string>;
  onHistoryItemClick?: (city: string) => void;
};

export const SearchCityHistoryList: FC<Props> = ({ searchHistory, onHistoryItemClick }) => {
  const dispatch = useAppDispatch();

  const handleClearHistory = () => {
    const yes = confirm('Are you sure you want to clear your search history?');
    if (yes) {
      dispatch(hydrateCitiesSearchHistory([]));
      setLocalStorageItem(LocalStorageItems.citiesSearchHistory, []);
    }
  };

  return (
    <div className="z-50 w-full max-w-96 absolute top-11 shadow-2xl shadow-slate-950">
      <ul className="search-history--list">
        <div className="flex justify-between p-2">
          <p className="italic">Recent cities search history</p>
          <button className="italic hover:underline text-red-800" onClick={handleClearHistory}>
            Clear history
          </button>
        </div>

        {searchHistory.map((city, index) => {
          return (
            <li
              tabIndex={0}
              key={city + index}
              className="search-history--item"
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
