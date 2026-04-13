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
    if (popup.offsetWidth === 0 && popup.offsetHeight === 0) return;

    setPopupPositionStyles(getPopupPosition());
  }, [getPopupPosition, anchorRef, popupRef]);

  useEffect(() => {
    if (!isVisible) {
      setIsRendered(false);
      setPopupPositionStyles(null);
    }
  }, [isVisible]);

  useLayoutEffect(() => {
    if (!isVisible || !popupRef.current || !anchorRef.current) return;

    const popup = popupRef.current;
    const anchorChild = anchorRef.current.firstElementChild as HTMLElement | null;

    const observer = new ResizeObserver(() => {
      updatePosition();
    });

    observer.observe(popup);
    if (anchorChild) observer.observe(anchorChild);

    const onResize = () => updatePosition();
    window.addEventListener("resize", onResize);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", onResize);
    vv?.addEventListener("scroll", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      vv?.removeEventListener("resize", onResize);
      vv?.removeEventListener("scroll", onResize);
    };
  }, [isVisible, popupRef, anchorRef, updatePosition]);

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
