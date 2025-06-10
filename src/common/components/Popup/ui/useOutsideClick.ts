import { useEffect, RefObject } from "react";

/**
 * Хук для отслеживания кликов вне указанных элементов
 * @param refs Массив ссылок на DOM-элементы
 * @param handler Функция, которая будет вызвана при клике вне элементов
 * @param enabled Флаг, включающий/выключающий отслеживание
 */
export const useOutsideClick = (
  refs: RefObject<HTMLElement>[],
  handler: () => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Проверяем, не принадлежит ли клик одному из элементов
      const isOutside = refs.every(ref => {
        const element = ref.current;
        return !element || !element.contains(target);
      });

      if (isOutside) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler, enabled]);
}; 