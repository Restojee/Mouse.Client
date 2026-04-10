import { useRef, useCallback } from "react";
import { usePopupPosition, UsePopupPositionOptions } from "@/ui/Popup/usePopupPosition";
import { usePopupRegistration } from "@/ui/Popup/usePopupRegistration";
import { usePopupVisibility } from "@/ui/Popup/usePopupVisibility";
import { useOutsideClick } from "@/ui/Popup";

interface UsePopupOptions extends Omit<UsePopupPositionOptions, "anchorRef" | "popupRef"> {
  isVisible: boolean;
  onClose?: () => void;
}

export const usePopup = (options: UsePopupOptions) => {
  const { isVisible, onClose, position, offset, boundary, anchorAlign } = options;

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
  });

  const { popupPositionStyles, isRendered } = usePopupVisibility(isVisible, getPopupPosition, anchorRef, popupRef);

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
