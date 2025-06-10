import React from 'react';

/**
 * Хук для отслеживания прокрутки страницы и закрытия попапа при скролле
 * @param onScroll Функция, которая будет вызвана при скролле
 * @param enabled Флаг, включающий/выключающий отслеживание
 */
export const useScrollDetection = (
  onScroll: () => void,
  enabled: boolean = true
) => {
  React.useEffect(() => {
    if (!enabled || !onScroll) return;

    // Обработчик прокрутки окна
    const handleWindowScroll = () => {
      onScroll();
    };

    // Находим все элементы с прокруткой в документе
    const findScrollableElements = () => {
      const scrollableElements: HTMLElement[] = [];
      const allElements = document.querySelectorAll('*');
      
      allElements.forEach(el => {
        const element = el as HTMLElement;
        const style = window.getComputedStyle(element);
        const hasScroll = 
          (style.overflow === 'auto' || 
           style.overflow === 'scroll' ||
           style.overflowY === 'auto' || 
           style.overflowY === 'scroll') && 
          element.scrollHeight > element.clientHeight;
        
        if (hasScroll) {
          scrollableElements.push(element);
        }
      });
      
      return scrollableElements;
    };
    
    // Получаем все элементы с прокруткой
    const scrollableElements = findScrollableElements();
    
    // Добавляем обработчики событий
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    
    scrollableElements.forEach(element => {
      element.addEventListener('scroll', handleWindowScroll, { passive: true });
    });
    
    // Также отслеживаем события мыши для определения начала прокрутки
    const handleMouseDown = (e: MouseEvent) => {
      // Проверяем, находится ли курсор на полосе прокрутки
      // Простой способ - если клик близко к правому или нижнему краю элемента
      const isOnScrollbar = (target: HTMLElement) => {
        const rect = target.getBoundingClientRect();
        const scrollbarWidth = target.offsetWidth - target.clientWidth;
        const scrollbarHeight = target.offsetHeight - target.clientHeight;
        
        return (
          (e.clientX > rect.right - scrollbarWidth && e.clientX <= rect.right) ||
          (e.clientY > rect.bottom - scrollbarHeight && e.clientY <= rect.bottom)
        );
      };
      
      // Если клик по полосе прокрутки любого элемента с возможностью прокрутки
      if (e.target instanceof HTMLElement && isOnScrollbar(e.target)) {
        onScroll();
      }
    };
    
    document.addEventListener('mousedown', handleMouseDown);
    
    // Очищаем обработчики при размонтировании
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      
      scrollableElements.forEach(element => {
        element.removeEventListener('scroll', handleWindowScroll);
      });
      
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onScroll, enabled]);
}; 
