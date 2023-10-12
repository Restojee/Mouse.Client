import React from 'react';
import { StyledBox } from '@/ui/Box';
import { StyledPagePanelButton } from '@/layout/page/styles/StyledPagePanelButton';

type PropsType = {
    isContentVisible?: boolean;
    icon?: React.ReactNode;
    content?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    type?: 'submit';
}
export const PagePanelItem = (props: PropsType) => {
    const {
        isContentVisible,
        content,
        children,
        onClick,
        disabled,
        type
    } = props

    return (
        <StyledBox gap={10}>
            {isContentVisible && content}
            <StyledPagePanelButton
                type={type || 'button'}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </StyledPagePanelButton>
        </StyledBox>
    );
};

export default PagePanelItem;
