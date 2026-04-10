import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { PositionStyles } from "./popupUtils";

export const usePopupVisibility = (
  isVisible: boolean,
  getPopupPosition: () => PositionStyles,
  anchorRef: React.RefObject<HTMLElement>,
  popupRef: React.RefObject<HTMLElement>,
) => {
  const [popupPositionStyles, setPopupPositionStyles] = useState<PositionStyles | null>(null);
  const [isRendered, setIsRendered] = useState<boolean>(false);

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const popup = popupRef.current;
    if (!anchor || !popup) return;

    const popupRect = popup.getBoundingClientRect();
    // Don't commit position until popup has actual dimensions
    if (popupRect.width === 0 && popupRect.height === 0) return;

    setPopupPositionStyles(getPopupPosition());
  }, [getPopupPosition, anchorRef, popupRef]);

  // Reset when hidden
  useEffect(() => {
    if (!isVisible) {
      setIsRendered(false);
      setPopupPositionStyles(null);
    }
  }, [isVisible]);

  // ResizeObserver is the single source of truth for position calculation.
  // It fires immediately on observe() with actual dimensions after browser layout,
  // avoiding the race condition of useEffect + getBoundingClientRect() on fresh mount.
  useLayoutEffect(() => {
    if (!isVisible || !popupRef.current || !anchorRef.current) return;

    const popup = popupRef.current;
    const anchorChild = anchorRef.current.firstElementChild as HTMLElement | null;

    const observer = new ResizeObserver(() => {
      updatePosition();
    });

    observer.observe(popup);
    if (anchorChild) observer.observe(anchorChild);

    // Also update on scroll/resize of the window
    const onScroll = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [isVisible, popupRef, anchorRef, updatePosition]);

  // Mark as rendered once we have a valid position
  useEffect(() => {
    if (popupPositionStyles) {
      setIsRendered(true);
    }
  }, [popupPositionStyles]);

  return {
    popupPositionStyles,
    isRendered,
    updatePosition,
  };
};
