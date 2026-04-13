/**
 * Чистые утилиты для drag-to-close жеста MobileSheet.
 * Никаких React/DOM-side-effects — только математика и обход дерева.
 */

/**
 * Параметры жеста. Все пороги — относительные (ratio от высоты листа
 * или пиксели), чтобы одинаково работало на разных экранах.
 */
export const GESTURE_CONFIG = {
  /** Сколько пикселей нужно протащить, чтобы жест считался drag'ом (иначе — тап/скролл). */
  lockDeltaPx: 8,
  /** Скорость (px/ms), начиная с которой жест считается "флик"ом (резкий смах). */
  flickVelocity: 0.5,
  /** Доля высоты листа — смещение, после которого жест воспринимается как "смена snap". */
  snapChangeRatio: 0.25,
  /** Доля высоты листа — абсолютное смещение от начала жеста, после которого лист закрывается без оглядки на snap. */
  forceCloseRatio: 0.5,
  /** Отступ от верха scroll-контейнера, ниже которого мы считаем его "не в начале". */
  scrollTopEpsilonPx: 1,
  /** CSS transition для анимации возврата к snap / закрытия. */
  transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
};

/** Дефолтные snap-позиции в процентах от высоты экрана: [компактная, полная]. */
export const DEFAULT_SNAP_POINTS = [50, 90];

/** Решение, что делать по завершении жеста. */
export type GestureIntent = { type: "close" } | { type: "snap"; index: number };

/** Данные, необходимые для решения об интенте в конце жеста. */
export type GestureEndInput = {
  /** Снап-точки в процентах от viewport. */
  snapPoints: number[];
  /** Индекс snap, с которого стартовали. */
  startSnapIndex: number;
  /** Высота листа (offsetHeight) — для расчёта порогов в px. */
  sheetHeight: number;
  /** Суммарный сдвиг пальца от touchstart до touchend по Y. */
  totalDy: number;
  /** Текущее смещение листа минус базовое (то, что ушло от snap'а за этот жест). */
  deltaFromBase: number;
  /** Последняя мгновенная скорость (px/ms, положительная = вниз). */
  velocity: number;
};

/**
 * Главная функция принятия решения: куда уехать после окончания жеста.
 *
 * Покрывает три кейса:
 * 1) close           — палец улетел далеко вниз или мы были на нижнем snap и смахнули вниз;
 * 2) snap: N-1 / N+1 — переход на соседнюю позицию, если прошли порог или сделали флик;
 * 3) snap: current   — возврат к исходному snap'у, если жест не дотянул до порога.
 */
export const resolveGestureIntent = (input: GestureEndInput): GestureIntent => {
  const { snapPoints, startSnapIndex, sheetHeight, totalDy, deltaFromBase, velocity } = input;

  const isDownFlick = velocity > GESTURE_CONFIG.flickVelocity;
  const isUpFlick = velocity < -GESTURE_CONFIG.flickVelocity;

  const pastSnapThreshold = Math.abs(deltaFromBase) >= sheetHeight * GESTURE_CONFIG.snapChangeRatio;
  const isForceClose = totalDy >= sheetHeight * GESTURE_CONFIG.forceCloseRatio;

  // 1) Улетели далеко вниз — закрыть безусловно.
  if (isForceClose) {
    return { type: "close" };
  }

  // 2) Уже на самой нижней позиции и пошли вниз (флик или порог) — закрыть.
  const wantsDown = isDownFlick || (deltaFromBase > 0 && pastSnapThreshold);
  if (startSnapIndex === 0 && wantsDown) {
    return { type: "close" };
  }

  // 3) Иначе — выбираем соседний snap: вниз, вверх или остаёмся на месте.
  const wantsUp = isUpFlick || (deltaFromBase < 0 && pastSnapThreshold);
  const lastSnap = snapPoints.length - 1;
  if (wantsDown) return { type: "snap", index: Math.max(0, startSnapIndex - 1) };
  if (wantsUp) return { type: "snap", index: Math.min(lastSnap, startSnapIndex + 1) };
  return { type: "snap", index: startSnapIndex };
};

/**
 * Вычислить translateY-offset (px), на котором должен стоять лист
 * для заданной snap-позиции.
 *
 * snapPoints — массив в процентах viewport'а, где последний — самая верхняя (полная) позиция.
 * Внутри листа "0 offset" означает полностью открытый (самый верхний snap),
 * поэтому каждый snap < max смещается вниз на (max - current)% от высоты экрана.
 */
export const computeSnapOffset = (snapPoints: number[], index: number, viewportHeight: number): number => {
  const clamped = Math.max(0, Math.min(snapPoints.length - 1, index));
  const max = snapPoints[snapPoints.length - 1];
  const current = snapPoints[clamped];
  return ((max - current) / 100) * viewportHeight;
};

/**
 * Подняться по DOM-дереву и найти ближайший скроллируемый контейнер
 * внутри листа. Нужен, чтобы различать "тащим лист" и "скроллим контент".
 */
export const findScrollableAncestor = (
  target: EventTarget | null,
  sheetRoot: HTMLElement | null,
): HTMLElement | null => {
  let el = target as HTMLElement | null;
  while (el && el !== sheetRoot) {
    if (el.scrollHeight > el.clientHeight + 1) {
      const { overflowY } = getComputedStyle(el);
      if (overflowY === "auto" || overflowY === "scroll") return el;
    }
    el = el.parentElement;
  }
  return null;
};

/**
 * Решить, во что "залочить" жест после первого сдвига.
 *
 * - handleBar перехватывает жест без вопросов — это "ручка" листа;
 * - движение вверх всегда оставляем скроллу контента;
 * - движение вниз становится drag'ом только если контент уже проскроллен до самого верха.
 */
export type GestureLock = "drag" | "scroll";

export const resolveGestureLock = (params: {
  dy: number;
  isOnHandleBar: boolean;
  scrollable: HTMLElement | null;
}): GestureLock => {
  const { dy, isOnHandleBar, scrollable } = params;

  if (isOnHandleBar) return "drag";
  if (dy < 0) return "scroll";

  const scrolledDown = scrollable ? scrollable.scrollTop > GESTURE_CONFIG.scrollTopEpsilonPx : false;
  return scrolledDown ? "scroll" : "drag";
};
