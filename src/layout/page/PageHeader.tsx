import { ReactElement } from "react";
import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { PagePanelSection } from "@/layout/page/PagePanelSection";
import { StyledPagePanel } from "@/layout/page/styles/StyledPagePanel";
import Dropdown from "@/ui/Dropdown/Dropdown";

type Props = {
    children: ReactElement;
}
export const PageHeader = (props: Partial<Props>) => {
    return (
        <StyledPagePanel bottom>
            { props.children }
        </StyledPagePanel>
    )
}
