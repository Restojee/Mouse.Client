import { MapContext } from "@/modules/map/components/MapContext";
import { ReactNode } from "react";

type MapProviderProps = {
  children: ReactNode;
};
export const MapProvider = (props: MapProviderProps) => {
  const { children } = props;

  return <MapContext.Provider value={null}>{children}</MapContext.Provider>;
};
