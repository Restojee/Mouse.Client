import { useCallback, useEffect, useRef } from "react";
import {
  computeSnapOffset,
  DEFAULT_SNAP_POINTS,
  findScrollableAncestor,
  GESTURE_CONFIG,
  GestureLock,
  resolveGestureIntent,
  resolveGestureLock,
} from "./useDragToClose.utils";

/**
 * Изменяемое состояние текущего жеста. Живёт в useRef — чтобы не триггерить ре-рендеры.
 */
type DragState = {
  /** Палец сейчас на экране. */
  isTouching: boolean;
  /** Жест уже стал drag'ом (прошёл lock-порог). */
  isDragging: boolean;
  /** Во что залочили — drag листа или скролл контента. */
  lock: GestureLock | null;
  /** Y координата начала жеста. */
  startY: number;
  /** Последняя зафиксированная Y. */
  lastY: number;
  /** timeStamp последнего touchmove — для расчёта velocity. */
  lastTime: number;
  /** Мгновенная скорость (px/ms), положительная = вниз. */
  velocity: number;
  /** Текущее смещение листа (px от полностью открытого состояния). */
  currentOffset: number;
  /** Offset у snap'а, с которого стартовали. */
  baseOffset: number;
  /** Индекс snap'а, с которого стартовали. */
  snapIndex: number;
};

const createInitialDragState = (initialSnapIndex: number): DragState => ({
  isTouching: false,
  isDragging: false,
  lock: null,
  startY: 0,
  lastY: 0,
  lastTime: 0,
  velocity: 0,
  currentOffset: 0,
  baseOffset: 0,
  snapIndex: initialSnapIndex,
});

/**
 * Drag-to-close для мобильного sheet.
 *
 * Обрабатывает ровно три сценария:
 * - закрытие (флик вниз, большой сдвиг, либо вниз с нижнего snap'а);
 * - переход на полную позицию (верхний snap);
 * - переход на половинную позицию (нижний snap).
 *
 * Вся математика и решения — в useDragToClose.utils.ts. Здесь только оркестрация:
 * подписка на touch-события, обновление ref-state, применение CSS transform.
 */
export const useDragToClose = (
  sheetRef: React.RefObject<HTMLDivElement | null>,
  handleBarRef: React.RefObject<HTMLDivElement | null>,
  onClose: () => void,
  isOpen: boolean,
  snapPoints: number[] = DEFAULT_SNAP_POINTS,
) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const snapPointsRef = useRef(snapPoints);
  snapPointsRef.current = snapPoints;

  const drag = useRef<DragState>(createInitialDragState(snapPoints.length - 1));
  const isOnHandleBar = useRef(false);

  /** Записать translateY на лист. `animated` включает CSS transition. */
  const applyTransform = useCallback(
    (offset: number, animated: boolean) => {
      const el = sheetRef.current;
      if (!el) return;
      el.style.transition = animated ? GESTURE_CONFIG.transition : "none";
      el.style.transform = `translateY(${Math.max(0, offset)}px)`;
      drag.current.currentOffset = offset;
    },
    [sheetRef],
  );

  /** Анимированно встать на snap по индексу (и запомнить его как baseOffset). */
  const animateToSnap = useCallback(
    (index: number) => {
      const vh = typeof window !== "undefined" ? window.innerHeight : 0;
      const offset = computeSnapOffset(snapPointsRef.current, index, vh);
      drag.current.snapIndex = index;
      drag.current.baseOffset = offset;
      applyTransform(offset, true);
    },
    [applyTransform],
  );

  /** Запустить анимацию закрытия (уезд вниз на всю высоту листа) и дёрнуть onClose. */
  const animateClose = useCallback(() => {
    const el = sheetRef.current;
    if (el) {
      el.style.transition = GESTURE_CONFIG.transition;
      el.style.transform = "translateY(100%)";
    }
    onCloseRef.current();
  }, [sheetRef]);

  useEffect(() => {
    const container = sheetRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const d = drag.current;

      d.isTouching = true;
      d.isDragging = false;
      d.lock = null;
      d.startY = t.clientY;
      d.lastY = t.clientY;
      d.lastTime = e.timeStamp;
      d.velocity = 0;
      d.currentOffset = d.baseOffset;

      const handle = handleBarRef.current;
      isOnHandleBar.current = Boolean(handle && handle.contains(e.target as Node));
    };

    const onTouchMove = (e: TouchEvent) => {
      const d = drag.current;
      if (!d.isTouching || e.touches.length !== 1) return;

      const t = e.touches[0];
      const dy = t.clientY - d.startY;

      // Ждём, пока палец пройдёт lockDelta — только тогда решаем, drag это или scroll.
      if (d.lock === null) {
        if (Math.abs(dy) < GESTURE_CONFIG.lockDeltaPx) return;
        d.lock = resolveGestureLock({
          dy,
          isOnHandleBar: isOnHandleBar.current,
          scrollable: findScrollableAncestor(e.target, sheetRef.current),
        });
      }

      // Скролл контента не трогаем.
      if (d.lock === "scroll") return;

      e.preventDefault();
      d.isDragging = true;

      // Считаем мгновенную скорость по последнему кадру — нужна для distinguish флика на touchend.
      const dt = e.timeStamp - d.lastTime;
      if (dt > 0) d.velocity = (t.clientY - d.lastY) / dt;
      d.lastY = t.clientY;
      d.lastTime = e.timeStamp;

      // В процессе перетаскивания — без анимации, transform идёт за пальцем 1:1.
      applyTransform(d.baseOffset + dy, false);
    };

    const onTouchEnd = () => {
      const d = drag.current;
      if (!d.isTouching) return;
      d.isTouching = false;

      // Тап без движения — ничего не трогаем.
      if (!d.isDragging) return;
      d.isDragging = false;

      const sheet = sheetRef.current;
      const intent = resolveGestureIntent({
        snapPoints: snapPointsRef.current,
        startSnapIndex: d.snapIndex,
        sheetHeight: sheet?.offsetHeight || 300,
        totalDy: d.lastY - d.startY,
        deltaFromBase: d.currentOffset - d.baseOffset,
        velocity: d.velocity,
      });

      if (intent.type === "close") {
        animateClose();
      } else {
        animateToSnap(intent.index);
      }
    };

    // Случайное прерывание — вернуть лист на исходный snap.
    const onTouchCancel = () => {
      const d = drag.current;
      d.isTouching = false;
      d.isDragging = false;
      applyTransform(d.baseOffset, true);
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
  }, [handleBarRef, sheetRef, applyTransform, animateClose, animateToSnap]);

  // При открытии листа — чистим inline стили, оставшиеся после предыдущего закрытия.
  // При закрытии — НЕ чистим, чтобы не прервать анимацию translateY(100%).
  useEffect(() => {
    if (!isOpen) {
      const d = drag.current;
      d.isTouching = false;
      d.isDragging = false;
      d.baseOffset = 0;
      d.snapIndex = snapPointsRef.current.length - 1;
      return;
    }
    if (sheetRef.current) {
      sheetRef.current.style.transition = "";
      sheetRef.current.style.transform = "";
    }
  }, [isOpen, sheetRef]);
};
