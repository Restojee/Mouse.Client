import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { useCallback } from "react";

export const useMapNavigation = () => {
  const queryParams = useFilterQueryParams();

  const navigateTo = useCallback(
    async (query?: Partial<GetMapsApiArg>) => {
      await queryParams.changeFilterNavigate({ ...query });
    },
    [queryParams],
  );

  return {
    filters: queryParams.filter,
    navigateTo,
  };
};
