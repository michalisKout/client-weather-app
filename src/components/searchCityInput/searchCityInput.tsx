import { useSearchCityInput } from '@/components/searchCityInput/hooks/useSearchCityInput';
import { SearchCityHistoryList } from '@/components/searchCityInput/searchCityHistoryList';
import { ClickAwayListener } from '@/components/utils/clickAwayListener';
import {
  hydrateCitiesSearchHistory,
  selectSearchHistory,
  updateCityValue,
} from '@/domain/store/modules/user';
import { selectWeatherDataError } from '@/domain/store/modules/weather';
import { useAppSelector } from '@/domain/store/store.types';
import { LocalStorageItems, getLocalStorageItem } from '@/utils/localStorage';
import { useEffect } from 'react';

export const SearchCityInput = () => {
  const {
    isInputFocused,
    setInput,
    input,
    inputRef,
    setIsInputFocused,
    handleChange,
    handleKeyDown,
    dispatch,
  } = useSearchCityInput();
  const error = useAppSelector(selectWeatherDataError);
  const searchHistory = useAppSelector(selectSearchHistory);

  useEffect(() => {
    const savedSearchHistory = getLocalStorageItem<Array<string>>(
      LocalStorageItems.citiesSearchHistory,
    );

    if (savedSearchHistory) {
      dispatch(hydrateCitiesSearchHistory(savedSearchHistory));
      setInput(savedSearchHistory[0]);
      dispatch(updateCityValue(savedSearchHistory[0]));
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full items-center relative">
      <ClickAwayListener
        styleOptions={{ width: '24rem' }}
        onClickAway={() => setIsInputFocused(false)}
      >
        <input
          data-testid="search-city-input"
          ref={inputRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputFocused(true)}
          placeholder="Search for your preferred city..."
          className={`search-city-input search-city-input__${error ? 'error' : 'default'}`}
        />
        {isInputFocused && searchHistory.length > 0 && (
          <SearchCityHistoryList
            searchHistory={searchHistory}
            onHistoryItemClick={(city) => {
              setInput(city);
              dispatch(updateCityValue(city));
            }}
          />
        )}
      </ClickAwayListener>

      {error && <div className="w-fit text-red-600 font-bold">{error}</div>}
    </div>
  );
};
