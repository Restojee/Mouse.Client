import { useRef, useCallback, useEffect, useMemo } from "react";
import { usePopupPosition, UsePopupPositionOptions } from "@/ui/Popup/usePopupPosition";
import { usePopupRegistration } from "@/ui/Popup/usePopupRegistration";
import { usePopupVisibility } from "@/ui/Popup/usePopupVisibility";
import { useOutsideClick } from "@/ui/Popup";

interface UsePopupOptions extends Omit<UsePopupPositionOptions, "anchorRef" | "popupRef"> {
  isVisible: boolean;
  onClose?: () => void;
}

export const usePopup = (options: UsePopupOptions) => {
  const { isVisible, onClose, position, offset, boundary, anchorAlign, fixedAnchorRect } = options;

  const anchorRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const popupContext = usePopupRegistration(popupRef, isVisible);

  const getPopupPosition = usePopupPosition({
    position,
    anchorRef,
    popupRef,
    offset,
    boundary,
    anchorAlign,
    fixedAnchorRect,
  });

  const { popupPositionStyles, isRendered, updatePosition } = usePopupVisibility(
    isVisible,
    getPopupPosition,
    anchorRef,
    popupRef,
  );

  useEffect(() => {
    if (isVisible && fixedAnchorRect) {
      updatePosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixedAnchorRect?.top, fixedAnchorRect?.left, isVisible]);

  const checkNestedPopups = useCallback(
    (target: Node) => {
      if (popupContext) {
        return popupContext.isClickInsideAnyPopup(target);
      }
      return false;
    },
    [popupContext],
  );

  const outsideRefs = useMemo(() => [anchorRef, popupRef], []);
  useOutsideClick(outsideRefs, onClose, isVisible, checkNestedPopups);

  useEffect(() => {
    if (!isVisible || !onClose) return;
    const onScroll = (e: Event) => {
      const popup = popupRef.current;
      if (popup && e.target instanceof Node && popup.contains(e.target)) return;
      onClose();
    };
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [isVisible, onClose]);

  return {
    anchorRef,
    popupRef,
    popupPositionStyles,
    isRendered,
    popupContext,
  };
};
