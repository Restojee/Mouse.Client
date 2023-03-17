import { StyledPageWrapper } from "@/layout/page/styles/StyledPageWrapper";
import { StyledPageContent } from "@/layout/page/styles/StyledPageContent";
import { wrapper } from "@/store";
import { mouseMapsApi, useGetMapsQuery } from "@/api/codegen/mouseMapsApi";
import { MapContent } from "@/modules/map/MapContent";
import { Layout } from "@/layout/Layout";
import { PageHeader } from "@/layout/page/PageHeader";
import { PageFooter } from "@/layout/page/PageFooter";

export const getStaticProps = wrapper.getStaticProps(store => async () => {
    const result = await store.dispatch(mouseMapsApi.endpoints.getMaps.initiate({ page: 0, size: 10 }));
    return {
        props: { data: result.data }
    }
});
export default function Maps() {
    const { data: maps } = useGetMapsQuery({ page: 0, size: 10 });
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
