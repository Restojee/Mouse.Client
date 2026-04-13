export enum PopupPosition {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}

export enum AnchorAlign {
  START = "start",
  CENTER = "center",
  END = "end",
}

export interface BoundaryOptions {
  checkBoundary?: boolean;
  margin?: number;
  flip?: boolean;
}

export interface ElementRect {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface PositionStyles {
  position: "fixed";
  left: number;
  top: number;
}

export const calculateBasePosition = (
  position: PopupPosition,
  anchorRect: ElementRect,
  popupRect: ElementRect,
  offset: number,
  anchorAlign: AnchorAlign = AnchorAlign.CENTER,
): PositionStyles => {
  let top = 0;
  let left = 0;

  switch (position) {
    case PopupPosition.TOP:
      top = anchorRect.top - popupRect.height - offset;
      if (anchorAlign === AnchorAlign.START) {
        left = anchorRect.left;
      } else if (anchorAlign === AnchorAlign.END) {
        left = anchorRect.right - popupRect.width;
      } else {
        left = anchorRect.left + (anchorRect.width - popupRect.width) / 2;
      }
      break;
    case PopupPosition.BOTTOM:
      top = anchorRect.bottom + offset;
      if (anchorAlign === AnchorAlign.START) {
        left = anchorRect.left;
      } else if (anchorAlign === AnchorAlign.END) {
        left = anchorRect.right - popupRect.width;
      } else {
        left = anchorRect.left + (anchorRect.width - popupRect.width) / 2;
      }
      break;
    case PopupPosition.LEFT:
      left = anchorRect.left - popupRect.width - offset;
      if (anchorAlign === AnchorAlign.START) {
        top = anchorRect.top;
      } else if (anchorAlign === AnchorAlign.END) {
        top = anchorRect.bottom - popupRect.height;
      } else {
        top = anchorRect.top + (anchorRect.height - popupRect.height) / 2;
      }
      break;
    case PopupPosition.RIGHT:
      left = anchorRect.right + offset;
      if (anchorAlign === AnchorAlign.START) {
        top = anchorRect.top;
      } else if (anchorAlign === AnchorAlign.END) {
        top = anchorRect.bottom - popupRect.height;
      } else {
        top = anchorRect.top + (anchorRect.height - popupRect.height) / 2;
      }
      break;
  }

  return { top, left, position: "fixed" };
};

export const adjustToViewport = (
  basePosition: Pick<PositionStyles, "top" | "left">,
  position: PopupPosition,
  anchorRect: ElementRect,
  popupRect: ElementRect,
  viewportSize: ViewportSize,
  options: BoundaryOptions,
  offset: number,
  viewportOffset: { top: number; left: number } = { top: 0, left: 0 },
): PositionStyles => {
  if (!options.checkBoundary) {
    return { ...basePosition, position: "fixed" };
  }

  const { margin = 10, flip = true } = options;
  let { top, left } = basePosition;

  const minLeft = viewportOffset.left + margin;
  const maxRight = viewportOffset.left + viewportSize.width - margin;
  const minTop = viewportOffset.top + margin;
  const maxBottom = viewportOffset.top + viewportSize.height - margin;

  // Горизонтальный flip
  if (flip && (position === PopupPosition.LEFT || position === PopupPosition.RIGHT)) {
    const fitsOnRight = anchorRect.right + offset + popupRect.width <= maxRight;
    const fitsOnLeft = anchorRect.left - offset - popupRect.width >= minLeft;

    if (position === PopupPosition.RIGHT && !fitsOnRight && fitsOnLeft) {
      left = anchorRect.left - popupRect.width - offset;
    } else if (position === PopupPosition.LEFT && !fitsOnLeft && fitsOnRight) {
      left = anchorRect.right + offset;
    }
  }

  // Вертикальный flip
  if (flip && (position === PopupPosition.TOP || position === PopupPosition.BOTTOM)) {
    const fitsOnBottom = anchorRect.bottom + offset + popupRect.height <= maxBottom;
    const fitsOnTop = anchorRect.top - offset - popupRect.height >= minTop;

    if (position === PopupPosition.BOTTOM && !fitsOnBottom && fitsOnTop) {
      top = anchorRect.top - popupRect.height - offset;
    } else if (position === PopupPosition.TOP && !fitsOnTop && fitsOnBottom) {
      top = anchorRect.bottom + offset;
    }
  }

  // Ограничиваем в пределах visual viewport
  if (left < minLeft) left = minLeft;
  if (left + popupRect.width > maxRight) {
    left = maxRight - popupRect.width;
  }
  if (top < minTop) top = minTop;
  if (top + popupRect.height > maxBottom) {
    top = maxBottom - popupRect.height;
  }

  left = Math.max(minLeft, left);
  top = Math.max(minTop, top);

  return { top, left, position: "fixed" };
};

export const getViewportSize = (): ViewportSize => {
  const vv = typeof window !== "undefined" ? window.visualViewport : null;
  return {
    width: vv?.width ?? window.innerWidth,
    height: vv?.height ?? window.innerHeight,
  };
};

export const getViewportOffset = (): { top: number; left: number } => {
  const vv = typeof window !== "undefined" ? window.visualViewport : null;
  return {
    top: vv?.offsetTop ?? 0,
    left: vv?.offsetLeft ?? 0,
  };
};

export const calculatePopupPosition = (
  position: PopupPosition,
  anchorRect: ElementRect,
  popupRect: ElementRect,
  offset: number,
  boundaryOptions: BoundaryOptions,
  anchorAlign: AnchorAlign = AnchorAlign.CENTER,
): PositionStyles => {
  const basePosition = calculateBasePosition(position, anchorRect, popupRect, offset, anchorAlign);
  const viewportSize = getViewportSize();
  const viewportOffset = getViewportOffset();
  return adjustToViewport(
    basePosition,
    position,
    anchorRect,
    popupRect,
    viewportSize,
    boundaryOptions,
    offset,
    viewportOffset,
  );
};
