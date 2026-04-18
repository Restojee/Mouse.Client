import { useEffect, useRef, useState } from "react";

const ANIM_MS = 180;

/**
 * Хук анимации закрытия для десктопного sheet.
 * Управляет состояниями visible/closing для fade/scale анимации.
 */
export const useClosingAnimation = (isOpen: boolean) => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setClosing(false);
      setVisible(true);
    } else if (visible) {
      setClosing(true);
      closeTimer.current = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, ANIM_MS);
    }
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [isOpen]);

  return { visible, closing, animationDuration: ANIM_MS };
};
