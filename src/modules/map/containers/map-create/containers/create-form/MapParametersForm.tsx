import { useMapCreate } from '@/modules/map/containers/map-create/hooks/useMapCreate';
import React, { useState } from 'react';
import { PointBlock } from '@/ui/PointBlock/PointBlock';
import { StyledBox } from '@/ui/Box';
import { Typography } from '@/ui/Typography/styles/Typography';
import { EditFillIcon } from '@/svg/EditFillIcon';
import { ImageForm } from '@/ui/ImageForm/ImageForm';
import { StyledTag } from '@/ui/Tag/styled';
import { StyledButtonIcon } from '@/ui/Button/styles/StyledButtonIcon';
import { useAppTheme } from '@/hooks/useAppTheme';

export const MapParametersForm = () => {
    const theme = useAppTheme();
    const [mapImage, setMapImage] = useState<string | null>(null);

    const {
        setImage
    } = useMapCreate()

    const onChangePackImage = (file: string) => {
        setMapImage(file);
        setImage(file);
    };

    return (
        <PointBlock
            header="Доп. параметры карты"
            width="230px"
            bottom="60px"
        >
            <StyledBox
                width={'100%'}
                gap="15px"
                direction="column"
            >
                <ImageForm
                    fileType="image"
                    onChange={onChangePackImage}
                    value={mapImage}
                />
                <StyledBox wrap={'wrap'} gap={5}>
                    <Typography>Теги: </Typography>
                    <StyledTag small>Тег</StyledTag>
                    <StyledButtonIcon>
                        <EditFillIcon color={theme.colors.iconOnSecondary} size="15px"/>
                    </StyledButtonIcon>
                </StyledBox>
            </StyledBox>
        </PointBlock>
    );
};
