import { useAppDispatch } from "@/hooks/useAppDispatch";
import { MapPageContainer } from "@/modules/map/components/MapContainer";
import { AsyncMapViewModal } from "@/modules/map/containers";
import { MapsQueryParams } from "@/modules/map/containers/map-list";
import { MapsList } from "@/modules/map/containers/map-list/ui/maps-list/MapsList";
import { getUsersThunk } from "@/modules/user/slice";
import { MetaTags } from "@/ui/MetaTags/MetaTags";
import React, { Suspense, useEffect } from "react";

export default function Maps() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  return (
    <MapPageContainer>
      <MetaTags title={"Maps"} />
      <MapsQueryParams />
      <MapsList />
      <Suspense fallback={null}>
        <AsyncMapViewModal />
      </Suspense>
    </MapPageContainer>
  );
}
