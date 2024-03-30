import { StyledPageContent } from '@/layout/page/styles/StyledPageContent';
import { StyledBox } from '@/ui/Box';
import React, { ReactNode, Ref, RefObject } from "react";

type Props = {
    children: ReactNode;
    id?: string;
}
// eslint-disable-next-line react/display-name
export const PageContent = React.forwardRef((props: Partial<Props>) => {
    return (
        <StyledBox
            overflow={'hidden'}
            position={'relative'}
            grow={1}
        >
            <StyledPageContent id={"maps-page-container"}>
                {props.children}
            </StyledPageContent>
        </StyledBox>
    );
});