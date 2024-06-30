import Root from '@/pages/Root';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockStoreProvider } from '@/utils/testUtils';
import weather from '@/__MOCKS__/weather';
import { getWeatherCurrentLocation } from '@/services/weatherApi';
import { RootState } from '@/domain/store/store.types';

vi.mock('@/services/weatherApi', () => ({
  getWeatherCurrentLocation: vi.fn(),
}));

const mockGetWeatherCurrentLocation = vi.mocked(getWeatherCurrentLocation);

const initState: RootState = {
  user: { cityValue: 'Athens', searchHistory: [], favoriteCities: [] },
  weather: { loading: false },
};

describe('Root', () => {
  it('should match loading snapshot', () => {
    mockGetWeatherCurrentLocation.mockReturnValue(Promise.resolve(weather));

    const { baseElement } = render(
      <MockStoreProvider preloadState={initState}>
        <Root />
      </MockStoreProvider>,
    );

    expect(baseElement).toMatchSnapshot();
  });
  it('should match snapshot', async () => {
    mockGetWeatherCurrentLocation.mockReturnValue(Promise.resolve(weather));

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

    await screen.getByDisplayValue('Athens');

    fireEvent.focus(input);

    await screen.findByText('Recent cities search history');
    expect(screen.getByRole('listitem')).toHaveTextContent('Athens');
  });
});
