import { useEffect } from "react";

export const useGlobalKeyDown = (callback: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleClick = (e: KeyboardEvent) => {
      callback(e);
    };

    document.addEventListener("keyup", handleClick);

    return () => {
      document.removeEventListener("keyup", handleClick);
    };
  }, [callback]);
};
