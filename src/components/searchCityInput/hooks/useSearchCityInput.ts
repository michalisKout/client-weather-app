import {
  selectSearchHistory,
  selectCityInput,
  updateCityValue,
  addCityToHistory,
} from '@/domain/store/modules/user';
import { useAppDispatch, useAppSelector } from '@/domain/store/store.types';
import { useRef, useState, useCallback, ChangeEvent, FormEvent } from 'react';

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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = !!input.trim();
    if (!isValid) return;

    if (input !== existingCitySearchInput) dispatch(updateCityValue(input));

    if (!searchHistory.includes(input)) dispatch(addCityToHistory(input));

    setIsInputFocused(false);
  };

  return {
    handleChange,
    handleFormSubmit,
    isInputFocused,
    setIsInputFocused,
    setInput,
    input,
    inputRef,
    dispatch,
  };
};
