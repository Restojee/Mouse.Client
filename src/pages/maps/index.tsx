import { StyledPageWrapper } from "@/layout/page/styles/StyledPageWrapper";
import { StyledPageContent } from "@/layout/page/styles/StyledPageContent";
import { wrapper } from "@/store";
import { MapsContent } from "@/modules/map/MapsContent";
import { Layout } from "@/layout/Layout";
import { PageHeader } from "@/layout/page/PageHeader";
import { PageFooter } from "@/layout/page/PageFooter";
import {
    mapsApi,
    useGetMapsQuery
} from "@/api/mapsApi";
import { MapPageContainer } from "@/modules/map/MapContainer";

export const getServerSideProps = wrapper.getStaticProps(store => async () => {
    const props = {}
    await store.dispatch(mapsApi.endpoints.getMaps.initiate({ page: 0, size: 20 }));
    return { props }
});
const Maps = () => {
    const { data: maps } = useGetMapsQuery({ page: 0, size: 20 });
    return (
        <MapPageContainer>
            <MapsContent maps={ maps } />
        </MapPageContainer>
    )
}

export default Maps;
