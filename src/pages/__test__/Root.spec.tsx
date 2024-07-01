import Root from '@/pages/Root';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockStoreProvider } from '@/utils/testUtils';
import weather from '@/__MOCKS__/weather';
import { getFavoriteCitiesWeatherData, getWeatherCurrentLocation } from '@/services/weatherApi';
import { RootState } from '@/domain/store/store.types';

vi.mock('@/services/weatherApi', () => ({
  getWeatherCurrentLocation: vi.fn(),
  getFavoriteCitiesWeatherData: vi.fn(),
}));

const mockGetWeatherCurrentLocation = vi.mocked(getWeatherCurrentLocation);

const mockGetFavoriteCitiesWeatherData = vi.mocked(getFavoriteCitiesWeatherData);

const initState: RootState = {
  user: { cityValue: 'Athens', searchHistory: [], favoriteCities: { loading: false, data: [] } },
  weather: { loading: false, initLoading: false },
};

describe('Root', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should match loading snapshot', () => {
    mockGetWeatherCurrentLocation.mockReturnValue(Promise.resolve(weather));
    mockGetFavoriteCitiesWeatherData.mockReturnValue(Promise.resolve([]));
    const { baseElement } = render(
      <MockStoreProvider preloadState={initState}>
        <Root />
      </MockStoreProvider>,
    );

    expect(baseElement).toMatchSnapshot();
  });
  it('should match snapshot', async () => {
    mockGetWeatherCurrentLocation.mockReturnValue(Promise.resolve(weather));
    mockGetFavoriteCitiesWeatherData.mockReturnValue(Promise.resolve([]));

    const { baseElement } = render(
      <MockStoreProvider preloadState={initState}>
        <Root />
      </MockStoreProvider>,
    );

    const city = await screen.findByText('Athens');

    expect(city).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });

  it('should display weather data for the provided city', async () => {
    mockGetWeatherCurrentLocation.mockReturnValue(Promise.resolve(weather));
    mockGetFavoriteCitiesWeatherData.mockReturnValue(Promise.resolve([]));

    render(
      <MockStoreProvider preloadState={initState}>
        <Root />
      </MockStoreProvider>,
    );

    const input = await screen.findByPlaceholderText('Search for your preferred city...');

    fireEvent.change(input, { target: { value: 'Athens' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Athens')).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    const condition = screen.getByText('Partly cloudy');

    expect(condition).toBeInTheDocument();
  });

  it('should display search history', async () => {
    mockGetWeatherCurrentLocation.mockReturnValue(Promise.resolve(weather));
    mockGetFavoriteCitiesWeatherData.mockReturnValue(Promise.resolve([]));

    render(
      <MockStoreProvider preloadState={initState}>
        <Root />
      </MockStoreProvider>,
    );

    const input = await screen.findByPlaceholderText('Search for your preferred city...');

    fireEvent.change(input, { target: { value: 'Athens' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Athens')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Search'));

    fireEvent.focus(input);

    await screen.findByText('Recent searched cities');
    expect(screen.getByRole('listitem')).toHaveTextContent('Athens');
  });

  it('should save favorite city', async () => {
    mockGetWeatherCurrentLocation.mockReturnValue(Promise.resolve(weather));
    mockGetFavoriteCitiesWeatherData.mockReturnValue(Promise.resolve([]));

    render(
      <MockStoreProvider preloadState={initState}>
        <Root />
      </MockStoreProvider>,
    );

    expect(screen.getByText('Your favorite cities list is empty!')).toBeInTheDocument();

    expect(screen.getByText('Start adding cities by pressing ❤ button.')).toBeInTheDocument();

    expect(screen.queryByTestId('fav-city-Athens-0')).not.toBeInTheDocument();
    // user selects favorite city
    const favBtn = await screen.findByTestId('favorite-city-button');

    expect(screen.getByTestId('heart-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('heart-filled')).not.toBeInTheDocument();

    fireEvent.click(favBtn);

    await waitFor(() => {
      expect(screen.getByTestId('heart-filled')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('heart-empty')).not.toBeInTheDocument();

    // user sees the selected city in favorite list

    expect(screen.queryByTestId('Your favorite cities list is empty!')).not.toBeInTheDocument();

    expect(
      screen.queryByTestId('Start adding cities by pressing ❤ button.'),
    ).not.toBeInTheDocument();

    expect(screen.getByTestId('fav-city-Athens-0')).toBeInTheDocument();
  });

  it('should remove favorite city', async () => {
    mockGetWeatherCurrentLocation.mockReturnValue(Promise.resolve(weather));
    mockGetFavoriteCitiesWeatherData.mockReturnValue(Promise.resolve([]));

    render(
      <MockStoreProvider preloadState={initState}>
        <Root />
      </MockStoreProvider>,
    );

    // user selects favorite city
    const favBtn = await screen.findByTestId('favorite-city-button');

    expect(screen.getByTestId('heart-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('heart-filled')).not.toBeInTheDocument();

    fireEvent.click(favBtn);

    // city is saved in favorite cities list and heart is filled
    await waitFor(() => {
      expect(screen.getByTestId('heart-filled')).toBeInTheDocument();
      expect(screen.queryByTestId('heart-empty')).not.toBeInTheDocument();
      expect(screen.getByTestId('fav-city-Athens-0')).toBeInTheDocument();
    });

    // user removes favorite city

    const removeBtn = screen.getByTestId('fav-city-Athens-0-remove');

    fireEvent.click(removeBtn);

    // heart should empty and favorite city is removed from list
    await waitFor(() => {
      expect(screen.getByTestId('heart-empty')).toBeInTheDocument();
      expect(screen.queryByTestId('heart-filled')).not.toBeInTheDocument();
      expect(screen.queryByTestId('fav-city-Athens-0')).not.toBeInTheDocument();
    });
  });
});
