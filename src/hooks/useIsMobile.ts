import { useWindowDimension } from "@/hooks/useWindowDimension";

export const useIsMobile = (): boolean => {
  const { width } = useWindowDimension();
  return Boolean(width && width <= 768);
};
