import { RootState } from "@/store";

export const selectFilter = (state: RootState) => state.maps.filter;
export const selectMaps = (state: RootState) => state.maps.mapsData?.records;
export const selectIsMapsFetching = (state: RootState) => state.maps.isMapsFetching;
export const selectStaticMapsInfo = (state: RootState) => state.maps.staticMapsInfo;
export const selectMapsInfo = (state: RootState) => state.maps.mapsData;
export const selectModalMaps = (state: RootState) => state.maps.modalMapsData?.records;
export const selectIsModalMapsFetching = (state: RootState) => state.maps.isModalMapsFetching;
export const selectModalMapsInfo = (state: RootState) => state.maps.modalMapsData;
