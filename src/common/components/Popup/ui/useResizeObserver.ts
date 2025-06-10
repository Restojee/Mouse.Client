import { useLayoutEffect } from 'react';

interface UseResizeObserverOptions {
  refs: React.RefObject<HTMLElement>[];
  onResize: () => void;
  enabled?: boolean;
}

export const useResizeObserver = ({ refs, onResize, enabled = true }: UseResizeObserverOptions) => {
  useLayoutEffect(() => {
    if (!enabled) return;

    // Создаем ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      onResize();
    });

    // Добавляем обработчики для скролла и изменения размера окна
    window.addEventListener('scroll', onResize);
    window.addEventListener('resize', onResize);

    // Очистка при размонтировании
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onResize);
      window.removeEventListener('resize', onResize);
    };
  }, [refs, onResize, enabled]);
};
