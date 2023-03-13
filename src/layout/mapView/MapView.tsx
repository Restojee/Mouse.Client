import { useState } from 'react';
import { DesktopMapView } from "@/layout/mapView/desktop/DesktopMapView";
import { MobileMapView } from "@/layout/mapView/mobile/MobileMapView";

export const MapView = () => {
    const [miniMapActiveId, setMiniMapActiveId] = useState(-1);
    const [activeImage, setActiveImage] = useState(false);

    return (
        <>
            { window.innerWidth > 780
                ? <DesktopMapView messages={ [] } user={ 'Username' } date={ '20.03.2022' } />
                : <MobileMapView messages={ [] } user={ 'Username' } date={ '20.03.2022' } />
            }
        </>
    );
};

