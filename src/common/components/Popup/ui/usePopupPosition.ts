import React, { useCallback, useState, useRef } from "react";

export interface PositionStyles extends Pick<React.CSSProperties,
  | 'top'
  | 'left'
  | 'position'
  | 'opacity'
> {}

interface ElementRect {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

const defaultOffset = 15;

interface UsePopupPositionOptions {
  anchorRef: React.MutableRefObject<HTMLElement>,
  popupRef: React.MutableRefObject<HTMLElement>,
  position: 'bottom' | 'left' | 'top' | 'right'
}

export const usePopupPosition = ({ position = 'bottom', anchorRef, popupRef }: UsePopupPositionOptions) => {

  const lastKnownRect = useRef({
    anchor: null as ElementRect | null,
    popup: null as ElementRect | null
  });

  return useCallback((): PositionStyles => {
    const anchorElement = anchorRef.current;
    const popupElement = popupRef.current;

    if (!popupElement || !anchorElement) {
      return null
    }
    const anchorRect = anchorElement.getBoundingClientRect();
    const popupRect = popupElement.getBoundingClientRect();

    if (popupElement) {
      lastKnownRect.current = {
        anchor: anchorRect,
        popup: popupRect
      };
    }

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = anchorRect.top - popupRect.height - defaultOffset;
        left = anchorRect.left;
        break;
      case 'bottom':
        top = anchorRect.bottom + defaultOffset;
        left = anchorRect.left;
        break;
      case 'left':
        top = anchorRect.top;
        left = anchorRect.left - popupRect.width - defaultOffset;
        break;
      case 'right':
        top = anchorRect.top;
        left = anchorRect.right + defaultOffset;
        break;
    }

    return { 
      top, 
      left, 
      position: 'absolute'
    };
  }, [position, anchorRef, popupRef]);
};
