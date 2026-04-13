import { useRef, useCallback, useEffect } from "react";
import { usePopupRegistration } from "./usePopupRegistration";
import { usePopupVisibility } from "./usePopupVisibility";
import { useOutsideClick } from "./useOutsideClick";
import { usePopupPosition, type UsePopupPositionOptions } from "./usePopupPosition";

interface UsePopupOptions extends Omit<UsePopupPositionOptions, "anchorRef" | "popupRef"> {
  isVisible: boolean;
  onClose?: () => void;
  closeOnScroll?: boolean;
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

  useOutsideClick([anchorRef, popupRef], onClose, isVisible, checkNestedPopups);

  return {
    anchorRef,
    popupRef,
    popupPositionStyles,
    isRendered,
    popupContext,
  };
};
