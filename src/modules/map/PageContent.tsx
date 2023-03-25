import { StyledPageContent } from "@/layout/page/styles/StyledPageContent";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}
export const PageContent = (props: Partial<Props>) => {
    return (
        <StyledPageContent>
            { props.children }
        </StyledPageContent>
    )
}