import React, { useState } from 'react';
import { StyledBox } from "@/ui/Box";
import { StyledPagePanelButton } from "@/layout/page/styles/StyledPagePanelButton";

type PropsType = {
    setActiveItem?: (isActive: boolean) => void,
    onClick?: () => void,
    prepend?: React.ReactNode,
    activeIcon?: React.ReactNode,
    content?: React.ReactNode
}
export const PagePanelItem = (props: PropsType) => {
    const [isPagePanelItemOpen, setIsPagePanelItemOpen] = useState(false);

    const pagePanelItemClick = () => {
        setIsPagePanelItemOpen(!isPagePanelItemOpen);
    };
    return (
        <StyledBox>
            <StyledPagePanelButton onClick={pagePanelItemClick}>
                {props.prepend}
                {isPagePanelItemOpen && props.activeIcon}
            </StyledPagePanelButton>
            {isPagePanelItemOpen && props.content}
        </StyledBox>
    );
}

export default PagePanelItem;
