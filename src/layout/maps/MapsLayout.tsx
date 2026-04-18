import { useAppDispatch } from "@/hooks/useAppDispatch";
import { MapPageContainer } from "@/modules/map/components/MapContainer";
import { MapsQueryParams } from "@/modules/map/containers/map-list";
import { MapsList } from "@/modules/map/containers/map-list/ui/maps-list/MapsList";
import { getUsersThunk } from "@/modules/user/slice";
import { ReactNode, useEffect } from "react";

type MapsLayoutProps = {
  children?: ReactNode;
};

export const MapsLayout = ({ children }: MapsLayoutProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  return (
    <MapPageContainer>
      <MapsQueryParams />
      <main style={{ display: "contents" }}>
        <MapsList />
        {children}
      </main>
    </MapPageContainer>
  );
};
