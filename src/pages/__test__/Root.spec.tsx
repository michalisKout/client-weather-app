import Root from '@/pages/Root';
import { render } from '@testing-library/react';

describe('Root', () => {
  it('should match snapshot', () => {
    const { baseElement } = render(<Root />);
    expect(true).toBe(true);

    expect(baseElement).toMatchSnapshot();
  });
});
