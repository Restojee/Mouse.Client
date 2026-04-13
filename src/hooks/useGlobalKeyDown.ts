import { useEffect } from "react";

type KeyMap = Partial<Record<string, (e: KeyboardEvent) => void>>;

export const useGlobalKeyDown = (keyMap: KeyMap) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      keyMap[e.key]?.(e);
    };
    document.addEventListener("keyup", handler);
    return () => document.removeEventListener("keyup", handler);
  }, [keyMap]);
};
