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
): PositionStyles => {
  if (!options.checkBoundary) {
    return { ...basePosition, position: "fixed" };
  }

  const { margin = 10, flip = true } = options;
  let { top, left } = basePosition;
  let actualPosition = position;

  // Горизонтальный flip
  if (flip && (position === PopupPosition.LEFT || position === PopupPosition.RIGHT)) {
    const fitsOnRight = anchorRect.right + offset + popupRect.width <= viewportSize.width - margin;
    const fitsOnLeft = anchorRect.left - offset - popupRect.width >= margin;

    if (position === PopupPosition.RIGHT && !fitsOnRight && fitsOnLeft) {
      left = anchorRect.left - popupRect.width - offset;
      actualPosition = PopupPosition.LEFT;
    } else if (position === PopupPosition.LEFT && !fitsOnLeft && fitsOnRight) {
      left = anchorRect.right + offset;
      actualPosition = PopupPosition.RIGHT;
    }
  }

  // Вертикальный flip
  if (flip && (position === PopupPosition.TOP || position === PopupPosition.BOTTOM)) {
    const fitsOnBottom = anchorRect.bottom + offset + popupRect.height <= viewportSize.height - margin;
    const fitsOnTop = anchorRect.top - offset - popupRect.height >= margin;

    if (position === PopupPosition.BOTTOM && !fitsOnBottom && fitsOnTop) {
      top = anchorRect.top - popupRect.height - offset;
      actualPosition = PopupPosition.TOP;
    } else if (position === PopupPosition.TOP && !fitsOnTop && fitsOnBottom) {
      top = anchorRect.bottom + offset;
      actualPosition = PopupPosition.BOTTOM;
    }
  }

  // Ограничиваем в пределах viewport
  if (left < margin) left = margin;
  if (left + popupRect.width > viewportSize.width - margin) {
    left = viewportSize.width - popupRect.width - margin;
  }
  if (top < margin) top = margin;
  if (top + popupRect.height > viewportSize.height - margin) {
    top = viewportSize.height - popupRect.height - margin;
  }

  // Убедимся что не ушли в минус
  left = Math.max(margin, left);
  top = Math.max(margin, top);

  return { top, left, position: "fixed" };
};

export const getViewportSize = (): ViewportSize => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

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
  return adjustToViewport(basePosition, position, anchorRect, popupRect, viewportSize, boundaryOptions, offset);
};
