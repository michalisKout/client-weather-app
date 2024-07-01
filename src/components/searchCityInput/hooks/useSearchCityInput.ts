import {
  selectCityInput,
  updateCityValue,
  addCityToHistory,
  resetCityValue,
} from '@/domain/store/modules/user';
import { resetWeatherDataError } from '@/domain/store/modules/weather';

import { useAppDispatch, useAppSelector } from '@/domain/store/store.types';
import { useRef, useState, useCallback, ChangeEvent, FormEvent } from 'react';

export const useSearchCityInput = () => {
  const dispatch = useAppDispatch();
  const existingCitySearchInput = useAppSelector(selectCityInput);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') dispatch(resetWeatherDataError());

    setIsInputFocused(!!e.target.value);
    setInput(e.target.value);
  }, []);

  const resetInput = () => {
    setInput('');
    setIsInputFocused(false);
    dispatch(resetCityValue());
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = !!input.trim();
    if (!isValid) return;

    if (input !== existingCitySearchInput) dispatch(updateCityValue(input));

    dispatch(addCityToHistory(input));
    resetInput();
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
