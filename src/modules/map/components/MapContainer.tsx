import React, { ReactNode } from "react";
import { PageHeader } from "@/layout/page/PageHeader";
import { StyledPageWrapper } from "@/layout/page/styles/StyledPageWrapper";
import { PageFooter } from "@/layout/page/PageFooter";
import { PageContent } from "@/modules/map/components/PageContent";
import { MapCreateSection } from "@/modules/map/containers/map-create/ui/MapCreateSection";
import { MapSortSection } from "@/modules/map/containers/map-sort/MapSortSection";

type Props = {
    children: ReactNode;
}
export const MapPageContainer: React.FC<Partial<Props>> = (props) => {
    return (
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
    )
}