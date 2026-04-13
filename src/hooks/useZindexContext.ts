import { useEffect, useState } from "react";

const BASE_Z = 1600;
const STEP = 10;

let _stackSize = 0;

/**
 * Единый стек z-index для любых оверлейных слоёв (Sheet, Popup, Modal).
 * На маунте слой получает следующий свободный z-index, на анмаунте — счётчик уменьшается.
 * Это гарантирует, что попап, открытый поверх модалки, всегда окажется над ней.
 */
export const useZindexContext = (): number => {
  const [zIndex] = useState(() => {
    _stackSize++;
    return BASE_Z + _stackSize * STEP;
  });

  useEffect(() => {
    return () => {
      _stackSize = Math.max(0, _stackSize - 1);
    };
  }, []);

  return zIndex;
};
