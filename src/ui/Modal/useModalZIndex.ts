import { useEffect, useState } from "react";

// Module-level stack counter. Each mounted modal increments it, each unmount decrements.
// This ensures newly opened modals always appear above previously opened ones.
let _stackSize = 0;

const BASE_Z = 300;
const STEP = 10;

export const useModalZIndex = (): number => {
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
