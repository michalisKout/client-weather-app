import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ClickAwayListener } from '@/components/utils/clickAwayListener';

describe('ClickAwayListener', () => {
  it('should call onClickAway when clicking outside the component', () => {
    const onClickAway = vi.fn();
    render(
      <ClickAwayListener onClickAway={onClickAway}>
        <div>Click me</div>
      </ClickAwayListener>,
    );

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);

    fireEvent.mouseDown(outsideElement);

    expect(onClickAway).toHaveBeenCalledTimes(1);

    document.body.removeChild(outsideElement);
  });

  it('should not call onClickAway when clicking inside the component', () => {
    const onClickAway = vi.fn();

    render(
      <ClickAwayListener onClickAway={onClickAway}>
        <div>Click me</div>
      </ClickAwayListener>,
    );

    const insideElement = screen.getByText('Click me');

    fireEvent.mouseDown(insideElement);

    expect(onClickAway).not.toHaveBeenCalled();
  });
});
