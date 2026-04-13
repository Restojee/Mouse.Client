import { useCallback, useMemo } from "react";
import { useMapNavigation } from "../hooks/useMapNavigation";

export const useMapsByCategoryNavigation = () => {
  const { filters, navigateTo } = useMapNavigation();

  const isAllChecked = useMemo(() => Object.entries(filters).length < 4, [filters]);

  const onAllClickHandler = useCallback(() => {
    navigateTo({});
  }, [navigateTo]);

  return { isAllChecked, onAllClickHandler };
};
