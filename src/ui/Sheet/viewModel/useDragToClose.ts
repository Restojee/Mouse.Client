import { useCallback, useEffect, useRef } from "react";

const CLOSE_THRESHOLD_RATIO = 0.25;
const VELOCITY_THRESHOLD = 0.5;
const LOCK_DELTA = 8;
const TRANSITION = "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)";

type DragState = {
  active: boolean;
  dragging: boolean;
  locked: "drag" | "scroll" | null;
  startY: number;
  lastY: number;
  lastTime: number;
  velocity: number;
  offset: number;
};

/**
 * Drag-to-close для мобильного sheet.
 *
 * Жесты работают по всей области sheet:
 * - Если scrollable-контент проскроллен до верха и палец идёт вниз — двигаем sheet
 * - Если контент скроллится — не мешаем нативному скроллу
 * - HandleBar всегда перехватывает жест напрямую (без проверки скролла)
 */
export const useDragToClose = (
  sheetRef: React.RefObject<HTMLDivElement | null>,
  handleBarRef: React.RefObject<HTMLDivElement | null>,
  onClose: () => void,
  isOpen: boolean,
) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const drag = useRef<DragState>({
    active: false,
    dragging: false,
    locked: null,
    startY: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
    offset: 0,
  });

  const isOnHandleBar = useRef(false);

  const applyTransform = useCallback(
    (offset: number, animated: boolean) => {
      const el = sheetRef.current;
      if (!el) return;
      el.style.transition = animated ? TRANSITION : "none";
      el.style.transform = `translateY(${Math.max(0, offset)}px)`;
      drag.current.offset = offset;
    },
    [sheetRef],
  );

  const settle = useCallback(
    (close: boolean) => {
      applyTransform(0, true);
      if (close) {
        onCloseRef.current();
      }
    },
    [applyTransform],
  );

  /** Найти ближайший scrollable-предок от target внутри sheet */
  const getScrollableAncestor = useCallback(
    (target: EventTarget | null): HTMLElement | null => {
      let el = target as HTMLElement | null;
      const sheet = sheetRef.current;
      while (el && el !== sheet) {
        if (el.scrollHeight > el.clientHeight + 1) {
          const style = getComputedStyle(el);
          const ov = style.overflowY;
          if (ov === "auto" || ov === "scroll") return el;
        }
        el = el.parentElement;
      }
      return null;
    },
    [sheetRef],
  );

  useEffect(() => {
    const container = sheetRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const d = drag.current;
      d.active = true;
      d.dragging = false;
      d.locked = null;
      d.startY = t.clientY;
      d.lastY = t.clientY;
      d.lastTime = e.timeStamp;
      d.velocity = 0;
      d.offset = 0;

      const handle = handleBarRef.current;
      isOnHandleBar.current = Boolean(handle && handle.contains(e.target as Node));
    };

    const onTouchMove = (e: TouchEvent) => {
      const d = drag.current;
      if (!d.active || e.touches.length !== 1) return;

      const t = e.touches[0];
      const dy = t.clientY - d.startY;

      if (d.locked === null) {
        if (Math.abs(dy) < LOCK_DELTA) return;

        if (isOnHandleBar.current) {
          d.locked = "drag";
        } else if (dy > 0) {
          const scroller = getScrollableAncestor(e.target);
          if (scroller && scroller.scrollTop > 1) {
            d.locked = "scroll";
          } else {
            d.locked = "drag";
          }
        } else {
          d.locked = "scroll";
        }
      }

      if (d.locked === "scroll") return;

      e.preventDefault();
      d.dragging = true;

      const dt = e.timeStamp - d.lastTime;
      if (dt > 0) d.velocity = (t.clientY - d.lastY) / dt;
      d.lastY = t.clientY;
      d.lastTime = e.timeStamp;

      applyTransform(dy, false);
    };

    const onTouchEnd = () => {
      const d = drag.current;
      if (!d.active) return;
      d.active = false;

      if (!d.dragging) return;
      d.dragging = false;

      const sheet = sheetRef.current;
      const sheetH = sheet?.offsetHeight || 300;
      const isFlick = d.velocity > VELOCITY_THRESHOLD;
      const isPastThreshold = d.offset >= sheetH * CLOSE_THRESHOLD_RATIO;
      settle(isFlick || isPastThreshold);
    };

    const onTouchCancel = () => {
      const d = drag.current;
      d.active = false;
      d.dragging = false;
      applyTransform(0, true);
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [handleBarRef, sheetRef, applyTransform, settle, getScrollableAncestor]);

  useEffect(() => {
    if (!isOpen && sheetRef.current) {
      drag.current.active = false;
      drag.current.dragging = false;
      sheetRef.current.style.transition = "";
      sheetRef.current.style.transform = "";
    }
  }, [isOpen, sheetRef]);
};
