import { Layout } from "@/layout/Layout";
import { PageHeader } from "@/layout/page/PageHeader";
import { StyledPageWrapper } from "@/layout/page/styles/StyledPageWrapper";
import { StyledPageContent } from "@/layout/page/styles/StyledPageContent";
import { MapCard } from "@/modules/map/MapCard";
import { StyledMapsGrid } from "@/modules/map/styles/StyledMapsGrid";
import { PageFooter } from "@/layout/page/PageFooter";
import { useState } from "react";
import { StyledMegaShadow, StyledModalsWrapper } from "@/ui/Modal/styled";
import { DesktopMapView } from "@/layout/mapView/desktop/DesktopMapView";
import {useGetMapsQuery} from "@/api/codegen/mouseMapsApi";

export default function Maps() {

    const [isMapViewOpen, setIsMapViewOpen] = useState(false)
    const [currentMapViewId, setCurrentMapViewId] = useState(0)

    const { data: maps } = useGetMapsQuery({ page: 0, size: 1 })

    const onMapClickHandler = (id?: number) => {
        setIsMapViewOpen(true);
    };

    return (
        <Layout>
            <StyledPageWrapper>
                <PageHeader />
                <StyledPageContent>
                    <StyledMapsGrid>
                        { maps?.map(el => (
                            <MapCard
                                key={ el.id }
                                addedCount={ 1 }
                                commentsCount={ 1 }
                                label={ el.name }
                                image={ `http://tfm-maps.ru:9000/maps/${el.image}` }
                                onClick={() => onMapClickHandler(el.id)}
                            />
                        )) }
                    </StyledMapsGrid>
                </StyledPageContent>
                <PageFooter />
            </StyledPageWrapper>
            {isMapViewOpen && (
                <StyledModalsWrapper>
                    <StyledMegaShadow
                        onClick={() => setIsMapViewOpen(false)}
                    />
                    {/* <Modal type="Authorization" /> */}
                    <DesktopMapView messages={[]} user={'ada'} date={'adad'}/>
                </StyledModalsWrapper>
            )}
        </Layout>
    )
}
