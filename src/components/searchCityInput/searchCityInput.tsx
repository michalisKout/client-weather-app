import { useSearchCityInput } from '@/components/searchCityInput/hooks/useSearchCityInput';
import { SearchCityHistoryList } from '@/components/searchCityInput/searchCityHistoryList';
import { ClickAwayListener } from '@/components/utils/clickAwayListener';
import { selectSearchHistory, updateCityValue } from '@/domain/store/modules/user';
import { selectWeatherDataError, selectWeatherDataLoading } from '@/domain/store/modules/weather';
import { useAppSelector } from '@/domain/store/store.types';

export const SearchCityInput = () => {
  const {
    isInputFocused,
    setInput,
    input,
    inputRef,
    setIsInputFocused,
    handleChange,
    handleFormSubmit,
    dispatch,
  } = useSearchCityInput();
  const error = useAppSelector(selectWeatherDataError);
  const isLoadingWeatherData = useAppSelector(selectWeatherDataLoading);
  const searchHistory = useAppSelector(selectSearchHistory);

  return (
    <div className="flex flex-col gap-2 w-full items-center relative">
      <ClickAwayListener
        styleOptions={{ width: '24rem' }}
        onClickAway={() => {
          setIsInputFocused(false);
        }}
      >
        <form onSubmit={handleFormSubmit} className="search-city-input__form-container ">
          <input
            maxLength={30}
            required
            type="text"
            data-testid="search-city-input"
            ref={inputRef}
            value={input}
            onChange={handleChange}
            onClick={() => setIsInputFocused(true)}
            placeholder="Search for your preferred city..."
            className={`search-city-input search-city-input__${error ? 'error' : 'default'}`}
          />
          <button
            disabled={isLoadingWeatherData}
            className="search-city-input__submit"
            type="submit"
          >
            {isLoadingWeatherData ? <SubmitLoading /> : 'Search'}
          </button>
        </form>

        {isInputFocused && searchHistory.length > 0 && (
          <SearchCityHistoryList
            searchInput={input}
            searchHistory={searchHistory}
            onHistoryItemClick={(city) => {
              if (input) setInput('');
              setIsInputFocused(false);
              dispatch(updateCityValue(city));
            }}
          />
        )}
      </ClickAwayListener>

      {error && <div className="w-fit text-red-600 font-bold">{error}</div>}
    </div>
  );
};

function SubmitLoading() {
  return (
    <div className="grid place-content-center">
      <div className="flex items-center gap-2 text-gray-500">
        <span className="h-6 w-6 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
        loading...
      </div>
    </div>
  );
}
