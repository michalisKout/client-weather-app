import Root from '@/pages/Root';
import { render, screen } from '@testing-library/react';
import { MockStoreProvider } from '@/test.utils';
import weather from '@/__MOCKS__/weather';

describe('Root', () => {
  it('should match snapshot', async () => {
    const { baseElement } = render(
      <MockStoreProvider preloadState={{ weather: { loading: false, data: weather } }}>
        <Root />
      </MockStoreProvider>,
    );

    const city = await screen.findByText('Athens');

    expect(city).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });
});
