import React, { useEffect, useRef } from 'react';

interface ClickAwayListenerProps {
  onClickAway: () => void;
  children: React.ReactNode;
  styleOptions?: { width: React.CSSProperties['width'] };
}

export const ClickAwayListener = ({
  onClickAway,
  children,
  styleOptions,
}: ClickAwayListenerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      console.log(event.target);
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickAway]);

  return (
    <div style={{ width: styleOptions?.width || 'auto' }} ref={ref}>
      {children}
    </div>
  );
};
