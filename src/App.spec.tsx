import App from '@/App';
import { render } from '@testing-library/react';

describe('App', () => {
  it('should match snapshot', () => {
    const { baseElement } = render(<App />);
    expect(true).toBe(true);

    expect(baseElement).toMatchSnapshot();
  });
});
