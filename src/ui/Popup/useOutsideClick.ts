import { useEffect, RefObject } from "react";

export const useOutsideClick = (
  refs: RefObject<HTMLElement>[],
  handler?: () => void,
  enabled: boolean = true,
  checkAdditionalElements?: (target: Node) => boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _closeOnScroll?: boolean,
) => {
  useEffect(() => {
    if (!enabled || !handler) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (event.type === "mousedown" && (event as MouseEvent).button === 2) {
        return;
      }

      const target = event.target as Node | null;
      if (!target) return;

      for (const ref of refs) {
        if (ref.current?.contains(target)) {
          return;
        }
      }

      if (checkAdditionalElements && checkAdditionalElements(target)) {
        return;
      }

      handler();
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, { passive: true });
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [refs, handler, enabled, checkAdditionalElements]);
};
