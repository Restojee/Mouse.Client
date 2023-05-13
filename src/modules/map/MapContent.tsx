import { StyledMapContent } from "@/modules/map/styled";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}
export const MapContent = (props: Partial<Props>) => {
    return (
        <StyledMapContent>
            { props.children }
        </StyledMapContent>
    )
}