import {
  selectSearchHistory,
  selectCityInput,
  updateCityValue,
  addCityToHistory,
} from '@/domain/store/modules/user';
import { useAppDispatch, useAppSelector } from '@/domain/store/store.types';
import { useRef, useState, useCallback, ChangeEvent } from 'react';

export const useSearchCityInput = () => {
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector(selectSearchHistory);
  const existingCitySearchInput = useAppSelector(selectCityInput);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsInputFocused(!!e.target.value);
    setInput(e.target.value);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isValid = e.key === 'Enter' && !!input.trim();
    if (!isValid) return;

    if (input !== existingCitySearchInput) dispatch(updateCityValue(input));

    if (!searchHistory.includes(input)) dispatch(addCityToHistory(input));

    setIsInputFocused(false);
  };

  return {
    handleChange,
    handleKeyDown,
    isInputFocused,
    setIsInputFocused,
    setInput,
    input,
    inputRef,
    dispatch,
  };
};
