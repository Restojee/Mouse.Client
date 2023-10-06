import { wrapper } from "@/store";
import { MapsContent } from "@/modules/map/MapsContent";
import {
    mapsApi,
    useGetMapsQuery
} from "@/api/mapsApi";
import { MapPageContainer } from "@/modules/map/MapContainer";
import { MetaTags } from '@/ui/MetaTags/MetaTags';

export const getServerSideProps = wrapper.getStaticProps(store => async () => {
    const props = {}
    await store.dispatch(mapsApi.endpoints.getMaps.initiate({ page: 0, size: 20 }));
    return { props }
});

export default function Maps() {
    const { data: maps } = useGetMapsQuery({ page: 0, size: 20 });
    return (
        <MapPageContainer>
            <MetaTags title={'Maps'}/>
            <MapsContent maps={ maps } />
        </MapPageContainer>
    )
}