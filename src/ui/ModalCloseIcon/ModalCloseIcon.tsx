import { StyledModalCloseIcon } from './styles';
import React from 'react';
import { CloseIcon } from '@/svg/CloseIcon';
import { IconButton } from '@/ui/Button/IconButton';

type CloseIconPropsType = {
    onClick?: () => void;
    size?: number;
    color?: string;
}
export const ModalCloseIcon = ({ onClick, size, color }: CloseIconPropsType) => {
    return (
        <StyledModalCloseIcon>
            <IconButton onClick={onClick}>
                <CloseIcon
                    size={size || 40}
                />
            </IconButton>
        </StyledModalCloseIcon>
    );
};

