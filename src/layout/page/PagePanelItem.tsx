import React from 'react';
import { StyledBox } from '@/ui/Box';
import { StyledPagePanelButton } from '@/layout/page/styles/StyledPagePanelButton';

type PropsType = {
    isContentVisible?: boolean;
    icon: React.ReactNode;
    content?: React.ReactNode;
    onClick: () => void
}
export const PagePanelItem = (props: PropsType) => {
    const {
        isContentVisible,
        content,
        icon,
        onClick,
    } = props

    return (
        <StyledBox gap={10}>
            {isContentVisible && content}
            <StyledPagePanelButton onClick={onClick}>
                {icon}
            </StyledPagePanelButton>
        </StyledBox>
    );
};

export default PagePanelItem;
