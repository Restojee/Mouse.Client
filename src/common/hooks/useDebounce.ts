import * as React from 'react';

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const timoutRef = React.useRef<NodeJS.Timeout>();
  return React.useCallback((...args: any[]) => {
    if (timoutRef.current) {
      clearTimeout(timoutRef.current);
    }
    timoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, []);
};

export default useDebounce;
