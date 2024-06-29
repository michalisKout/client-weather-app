import { ClickAwayListener } from '@/components/utils/clickAwayListener';
import {
  addCityToHistory,
  hydrateCitiesSearchHistory,
  selectSearchHistory,
  updateCityValue,
} from '@/domain/store/modules/user';
import { selectWeatherDataError } from '@/domain/store/modules/weather';
import { useAppDispatch, useAppSelector } from '@/domain/store/store.types';
import { useEffect, useRef, useState } from 'react';

export const SearchCityInput = () => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectWeatherDataError);
  const searchHistory = useAppSelector(selectSearchHistory);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedSearchHistory = localStorage.getItem('citiesSearchHistory');
    if (savedSearchHistory) {
      const history = JSON.parse(savedSearchHistory) as Array<string>;
      dispatch(hydrateCitiesSearchHistory(history));
      setInput(history[0]);
      dispatch(updateCityValue(history[0]));
    }
  }, []);

  useEffect(() => {
    if (searchHistory.length)
      localStorage.setItem('citiesSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <div className="flex flex-col gap-2 w-full items-center relative">
      <ClickAwayListener styleOptions={{ width: '24rem' }} onClickAway={() => setIsFocused(false)}>
        <input
          data-testid="search-city-input"
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !!input.trim()) {
              dispatch(updateCityValue(input));
              if (!searchHistory.includes(input)) dispatch(addCityToHistory(input));
            }
          }}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for your preferred city..."
          className={`search-city-input search-city-input--${error ? 'error' : 'default'}`}
        />
        {isFocused && searchHistory.length > 0 ? (
          <div className="z-50 w-full max-w-96 absolute top-11 shadow-2xl shadow-slate-950">
            <ul className="search-history--list">
              <div className="flex justify-between p-2">
                <p className="italic">Recent cities search history</p>
                <button
                  className="italic hover:underline text-red-800"
                  onClick={() => {
                    const yes = confirm('Are you sure you want to clear your search history?');
                    if (yes) {
                      dispatch(hydrateCitiesSearchHistory([]));
                      localStorage.setItem('citiesSearchHistory', [].toString());
                    }
                  }}
                >
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
                      setInput(city);
                      dispatch(updateCityValue(city));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setInput(city);
                        dispatch(updateCityValue(city));
                      }
                    }}
                  >
                    {city}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </ClickAwayListener>

      {error && <div className="w-fit text-red-600 font-bold">{error}</div>}
    </div>
  );
};
