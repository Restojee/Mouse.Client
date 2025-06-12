import { useCallback, useRef } from "react";
import { 
  PopupPosition, 
  BoundaryOptions, 
  ElementRect, 
  PositionStyles, 
  calculatePopupPosition 
} from "./popupUtils";

// Значения по умолчанию
const DEFAULT_OFFSET = 15;
const DEFAULT_BOUNDARY_OPTIONS: BoundaryOptions = {
  checkBoundary: true,
  margin: 10,
  flip: true
};

interface UsePopupPositionOptions {
  anchorRef: React.MutableRefObject<HTMLElement>,
  popupRef: React.MutableRefObject<HTMLElement>,
  position?: PopupPosition | keyof typeof PopupPosition,
  offset?: number,
  boundary?: BoundaryOptions
}

/**
 * Хук для расчета позиции попапа относительно якорного элемента
 */
export const usePopupPosition = ({ 
  position = PopupPosition.BOTTOM, 
  anchorRef, 
  popupRef,
  offset = DEFAULT_OFFSET,
  boundary = DEFAULT_BOUNDARY_OPTIONS
}: UsePopupPositionOptions) => {
  // Кэшируем последние известные размеры элементов
  const lastKnownRect = useRef<{
    anchor: ElementRect | null,
    popup: ElementRect | null
  }>({
    anchor: null,
    popup: null
  });

  return useCallback((): PositionStyles | null => {
    const anchorElement = anchorRef.current;
    const popupElement = popupRef.current;

    // Если элементы не доступны, возвращаем null
    if (!popupElement || !anchorElement) {
      return null;
    }

    // Получаем актуальные размеры элементов
    const anchorRect = anchorElement.getBoundingClientRect();
    const popupRect = popupElement.getBoundingClientRect();

    // Сохраняем размеры для возможного использования в будущем
    lastKnownRect.current = {
      anchor: anchorRect,
      popup: popupRect
    };

    // Преобразуем строковое значение позиции в enum, если необходимо
    const positionEnum = (typeof position === 'string' && position in PopupPosition)
      ? PopupPosition[position as keyof typeof PopupPosition]
      : position as PopupPosition;

    // Используем утилитарную функцию для расчета позиции
    return calculatePopupPosition(
      positionEnum,
      anchorRect,
      popupRect,
      offset,
      boundary
    );
  }, [position, anchorRef, popupRef, offset, boundary]);
};

// Экспортируем типы и enum для использования в других компонентах
export { PopupPosition, type PositionStyles, type BoundaryOptions, type ElementRect };
