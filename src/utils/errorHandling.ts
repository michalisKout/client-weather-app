import { ApiErrorResponse } from '@/services/httpClient';
import { AxiosError } from 'axios';

export const handleApiErrorMessage = (error: AxiosError<ApiErrorResponse>) => {
  let errorMessage;
  const isClientError =
    error.response && error.response.status >= 400 && error.response.status < 500;

  if (isClientError) {
    errorMessage = error.response?.data.error.message || 'An error occurred';
  } else {
    errorMessage = 'An unexpected error occurred. Please try again later.';
  }

  return errorMessage;
};
