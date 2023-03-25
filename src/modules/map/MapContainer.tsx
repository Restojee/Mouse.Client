import {ReactElement, ReactNode} from "react";
import { PageHeader } from "@/layout/page/PageHeader";
import { StyledPageWrapper } from "@/layout/page/styles/StyledPageWrapper";
import { PageFooter } from "@/layout/page/PageFooter";
import { PageContent } from "@/modules/map/PageContent";
import { MapCreateSection } from "@/modules/map/MapCreateSection";
import { MapSortSection } from "@/modules/map/MapSortSection";
import {Layout} from "@/layout/Layout";

type Props = {
    children: ReactNode;
}
export const MapPageContainer = (props: Partial<Props>) => {

    return (
        <Layout>
            <StyledPageWrapper>
                <PageHeader>
                    <MapSortSection />
                </PageHeader>
                <PageContent>
                    { props.children }
                </PageContent>
                <PageFooter>
                    <MapCreateSection />
                </PageFooter>
            </StyledPageWrapper>
        </Layout>
    )
}