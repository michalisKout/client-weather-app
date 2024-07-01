export const dateOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };

const locale = 'en-US';

export const getDate = (dateValue: string, options: Intl.DateTimeFormatOptions) => {
  const date = new Date(dateValue);
  const formattedDate = date.toLocaleDateString(locale, options);

  if (formattedDate === 'Invalid Date') return;
  return formattedDate;
};
