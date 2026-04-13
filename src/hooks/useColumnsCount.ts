import { useMemo } from "react";
import { useWindowDimension } from "@/hooks/useWindowDimension";

/**
 * Breakpoints:
 *  < 1200px  → 2
 *  < 1600px  → 3
 *  ≥ 1600px  → 4
 */
export const useColumnsCount = (): number => {
  const { width } = useWindowDimension();

  return useMemo(() => {
    if (!width) return 2;
    if (width < 1200) return 2;
    if (width < 1600) return 3;
    return 4;
  }, [width]);
};
