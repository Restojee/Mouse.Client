import { GetMapsApiArg, GetMapsApiResponse } from "@/api/codegen/genMouseMapsApi";

export type MapsStateType = {
  isMapsFetching: boolean;
  filter: GetMapsApiArg;
  mapsData: GetMapsApiResponse | null;
  staticMapsInfo: GetMapsApiResponse | null;
};
