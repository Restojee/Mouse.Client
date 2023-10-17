import { DeleteIcon } from '@/svg/DeleteIcon';
import { EditFillIcon } from '@/svg/EditFillIcon';
import { StyledBox } from '@/ui/Box';
import { IconButton } from '@/ui/Button/IconButton';
import React from 'react';
import Image from 'next/image';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { DEFAULT_MAP_IMAGE } from '@/common/contants';
import { useAppTheme } from '@/hooks/useAppTheme';
import { StyledMapContentPreview } from '@/ui/Message/styled';

type MapContentPreviewPropsType = {
    image: Map['image']
}
export const Preview = ({ image }: MapContentPreviewPropsType) => {
    const theme = useAppTheme();

    return (
        <StyledMapContentPreview
            bgColor={theme.colors.mapBackground}
            maxHeight="400px"
            height="100%"
        >
            {/*<StyledBox>*/}
            {/*    <IconButton>*/}
            {/*        <EditFillIcon/>*/}
            {/*    </IconButton>*/}
            {/*    <IconButton>*/}
            {/*        <DeleteIcon/>*/}
            {/*    </IconButton>*/}
            {/*</StyledBox>*/}
            <Image
                src={image || DEFAULT_MAP_IMAGE}
                width={800}
                height={400}
                objectFit={'cover'}
                objectPosition={'center'}
                alt={'map'}
            />
        </StyledMapContentPreview>
    );
};

