import { StyledBox } from '@/ui/Box';
import React from 'react';
import { Tag } from '@/api/codegen/genMouseMapsApi';
import { useAppTheme } from '@/hooks/useAppTheme';
import { CloseIcon } from '@/svg/CloseIcon';
import { EditFillIcon } from '@/svg/EditFillIcon';
import { IconButton } from '@/ui/Button/IconButton';
import { StyledTag } from '@/ui/Tag/styled';
import { Typography } from '@/ui/Typography';

type MapContentFooterPropsType = {
    tags?: Tag[]
}
export const Tags = ({ tags }: MapContentFooterPropsType) => {
    const theme = useAppTheme();

    const onEditClickHandler = () => {
        alert('Пока не работает')
    }

    return (
        <StyledBox wrap={'wrap'} gap={10}>
            {tags?.map(({ name, id }) => (
                <StyledTag key={id} bgColor={theme.colors.primaryLighter}>
                    <Typography isEllipsis>{name}</Typography>
                    <IconButton isAdmin>
                        <CloseIcon/>
                    </IconButton>
                </StyledTag>
            ))}
            <IconButton margin={'0 0 0 10px'} onClick={onEditClickHandler}>
                <EditFillIcon/>
            </IconButton>
        </StyledBox>
    );
};

