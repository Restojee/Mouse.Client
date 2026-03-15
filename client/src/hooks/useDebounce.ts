import { useCallback, useRef } from "react";

export const useDebounce = <T>(callback: (args: T) => void, delay: number) => {
  const timoutRef = useRef<NodeJS.Timeout>();
  return useCallback(
    (args: T) => {
      if (timoutRef.current) {
        clearTimeout(timoutRef.current);
      }
      timoutRef.current = setTimeout(() => {
        callback(args);
      }, delay);
    },
    [callback, delay],
  );
};
