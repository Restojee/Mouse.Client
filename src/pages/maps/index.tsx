import { StyledPageWrapper } from "@/layout/page/styles/StyledPageWrapper";
import { StyledPageContent } from "@/layout/page/styles/StyledPageContent";
import { wrapper } from "@/store";
import { MapContent } from "@/modules/map/MapContent";
import { Layout } from "@/layout/Layout";
import { PageHeader } from "@/layout/page/PageHeader";
import { PageFooter } from "@/layout/page/PageFooter";
import {
    mapsApi,
    useGetMapsQuery
} from "@/api/mapsApi";

// export const getStaticProps = wrapper.getStaticProps(store => async () => {
//     await store.dispatch(mapsApi.endpoints.getMaps.initiate({ page: 0, size: 20 }));
//     return {
//         props: {  }
//     }
// });
export default function Maps() {
    const { data: maps } = useGetMapsQuery({ page: 0, size: 20 });
    return (
        <Layout>
            <StyledPageWrapper>
                <PageHeader />
                <StyledPageContent>
                    <MapContent maps={ maps } />
                </StyledPageContent>
                <PageFooter />
            </StyledPageWrapper>
        </Layout>
    )
}
