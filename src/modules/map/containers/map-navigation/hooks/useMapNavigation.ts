import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import useQueryParams from "@/hooks/useQueryParams";
import { useCallback } from "react";

export const useMapNavigation = () => {
  const queryParams = useQueryParams();

  const navigateTo = useCallback(
    async (query?: Partial<GetMapsApiArg>) => {
      await queryParams.changeFilterNavigate({ ...query });
    },
    [queryParams.changeFilterNavigate],
  );

  return {
    filters: queryParams.filter,
    navigateTo,
  };
};
