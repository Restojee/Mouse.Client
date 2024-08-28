import { useAppDispatch } from "@/hooks/useAppDispatch";
import { MapPageContainer } from "@/modules/map/components/MapContainer";
import { AsyncMapViewModal, useMapView } from "@/modules/map/containers";
import { MapsQueryParams } from "@/modules/map/containers/map-list";
import { MapsList } from "@/modules/map/containers/map-list/ui/MapsList";
import { AsyncModals } from "@/modules/modals/AsyncModals";
import { getUsersThunk } from "@/modules/user/slice";
import { Display } from "@/ui/Display";
import { MetaTags } from "@/ui/MetaTags/MetaTags";
import React, { Suspense, useEffect } from "react";

export default function Maps() {
  const { levelId } = useMapView();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  return (
    <MapPageContainer>
      <MetaTags title={"Maps"} />
      <MapsQueryParams />
      <MapsList />
      <Display condition={levelId}>
        <Suspense fallback={null}>
          <AsyncMapViewModal />
        </Suspense>
      </Display>
      <AsyncModals />
    </MapPageContainer>
  );
}
