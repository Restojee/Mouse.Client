import { CSSProperties } from 'react';

/**
 * Перечисление возможных позиций попапа
 */
export enum PopupPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right'
}

/**
 * Тип для настроек привязки к границам
 */
export interface BoundaryOptions {
  /** Учитывать границы экрана */
  checkBoundary?: boolean;
  /** Минимальный отступ от края экрана в пикселях */
  margin?: number;
  /** Автоматическое переключение стороны при выходе за границу */
  flip?: boolean;
}

/**
 * Тип для размеров элемента
 */
export interface ElementRect {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

/**
 * Тип для размеров viewport
 */
export interface ViewportSize {
  width: number;
  height: number;
}

/**
 * Тип для стилей позиционирования
 */
export interface PositionStyles extends Pick<CSSProperties,
  | 'position'
  | 'opacity'
> {
  left: number;
  top: number;
}

/**
 * Рассчитывает базовую позицию попапа относительно якоря
 */
export const calculateBasePosition = (
  position: PopupPosition,
  anchorRect: ElementRect,
  popupRect: ElementRect,
  offset: number
): PositionStyles => {
  let top = 0;
  let left = 0;

  // Базовое позиционирование
  switch (position) {
    case PopupPosition.TOP:
      top = anchorRect.top - popupRect.height - offset;
      left = anchorRect.left + (anchorRect.width - popupRect.width) / 2;
      break;
    case PopupPosition.BOTTOM:
      top = anchorRect.bottom + offset;
      left = anchorRect.left + (anchorRect.width - popupRect.width) / 2;
      break;
    case PopupPosition.LEFT:
      top = anchorRect.top + (anchorRect.height - popupRect.height) / 2;
      left = anchorRect.left - popupRect.width - offset;
      break;
    case PopupPosition.RIGHT:
      top = anchorRect.top + (anchorRect.height - popupRect.height) / 2;
      left = anchorRect.right + offset;
      break;
  }

  return { top, left, position: 'absolute' };
}

/**
 * Корректирует позицию попапа, чтобы он не выходил за границы экрана
 */
export const adjustToViewport = (
  basePosition: Pick<PositionStyles, 'top' | 'left'>,
  position: PopupPosition,
  anchorRect: ElementRect,
  popupRect: ElementRect,
  viewportSize: ViewportSize,
  options: BoundaryOptions,
  offset: number
): PositionStyles => {
  if (!options.checkBoundary) {
    return basePosition;
  }

  const { margin = 10, flip = true } = options;
  let { top, left } = basePosition;

  if (left < margin) {
    left = margin;
  } else if (left + popupRect.width > viewportSize.width - margin) {
    left = Math.max(margin, viewportSize.width - popupRect.width - margin);
  }

  if (top < margin) {
    if (position === PopupPosition.TOP && flip) {
      top = anchorRect.bottom + offset;
    } else {
      top = margin;
    }
  } else if (top + popupRect.height > viewportSize.height - margin) {
    if (position === PopupPosition.BOTTOM && flip) {
      top = Math.max(margin, anchorRect.top - popupRect.height - offset);
    } else {
      top = Math.max(margin, viewportSize.height - popupRect.height - margin);
    }
  }

  if (flip) {
    if (position === PopupPosition.LEFT && left < margin) {
      left = anchorRect.right + offset;
    } else if (position === PopupPosition.RIGHT && left + popupRect.width > viewportSize.width - margin) {
      left = Math.max(margin, anchorRect.left - popupRect.width - offset);
    }
  }

  return { ...basePosition, top, left };
}

/**
 * Получает размеры viewport
 */
export const getViewportSize = (): ViewportSize => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

/**
 * Комплексная функция для расчета позиции попапа
 */
export const calculatePopupPosition = (
  position: PopupPosition,
  anchorRect: ElementRect,
  popupRect: ElementRect,
  offset: number,
  boundaryOptions: BoundaryOptions
): PositionStyles => {
  const basePosition = calculateBasePosition(position, anchorRect, popupRect, offset);
  const viewportSize = getViewportSize();
  return adjustToViewport(basePosition, position, anchorRect, popupRect, viewportSize, boundaryOptions, offset);
} 
