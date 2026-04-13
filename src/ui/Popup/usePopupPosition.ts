import { useCallback, useRef } from "react";
import {
  PopupPosition,
  AnchorAlign,
  BoundaryOptions,
  ElementRect,
  PositionStyles,
  calculatePopupPosition,
} from "./popupUtils";

const DEFAULT_OFFSET = 15;
const DEFAULT_BOUNDARY_OPTIONS: BoundaryOptions = {
  checkBoundary: true,
  margin: 10,
  flip: true,
};

export interface UsePopupPositionOptions {
  anchorRef: React.RefObject<HTMLDivElement>;
  popupRef: React.RefObject<HTMLDivElement>;
  position?: PopupPosition | keyof typeof PopupPosition;
  offset?: number;
  boundary?: BoundaryOptions;
  anchorAlign?: AnchorAlign;
  fixedAnchorRect?: { top: number; left: number; width?: number; height?: number };
}

export const usePopupPosition = ({
  position = PopupPosition.BOTTOM,
  anchorRef,
  popupRef,
  offset = DEFAULT_OFFSET,
  boundary = DEFAULT_BOUNDARY_OPTIONS,
  anchorAlign = AnchorAlign.CENTER,
  fixedAnchorRect,
}: UsePopupPositionOptions) => {
  const lastKnownRect = useRef<{ anchor: DOMRect | null; popup: DOMRect | null }>({
    anchor: null,
    popup: null,
  });

  return useCallback((): PositionStyles => {
    const anchorElement = anchorRef.current;
    const popupElement = popupRef.current;

    if (!popupElement || !anchorElement) {
      return { left: 0, position: "fixed", top: 0 };
    }

    const popupWidth = popupElement.offsetWidth;
    const popupHeight = popupElement.offsetHeight;
    const popupRect = {
      top: 0,
      left: 0,
      right: popupWidth,
      bottom: popupHeight,
      width: popupWidth,
      height: popupHeight,
    } as DOMRect;

    const anchorRect: ElementRect = fixedAnchorRect
      ? {
          top: fixedAnchorRect.top,
          bottom: fixedAnchorRect.top + (fixedAnchorRect.height ?? 0),
          left: fixedAnchorRect.left,
          right: fixedAnchorRect.left + (fixedAnchorRect.width ?? 0),
          width: fixedAnchorRect.width ?? 0,
          height: fixedAnchorRect.height ?? 0,
        }
      : (() => {
          const actualAnchor = (anchorElement.firstElementChild as HTMLElement) || anchorElement;
          return actualAnchor.getBoundingClientRect();
        })();

    lastKnownRect.current = {
      anchor: anchorRect as DOMRect,
      popup: popupRect,
    };

    const positionEnum =
      typeof position === "string" && position in PopupPosition
        ? PopupPosition[position as keyof typeof PopupPosition]
        : (position as PopupPosition);

    return calculatePopupPosition(positionEnum, anchorRect, popupRect, offset, boundary, anchorAlign);
  }, [position, anchorRef, popupRef, offset, boundary, anchorAlign, fixedAnchorRect]);
};

export { PopupPosition, AnchorAlign, type PositionStyles, type BoundaryOptions, type ElementRect };
