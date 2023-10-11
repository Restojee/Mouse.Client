import React, { useState } from 'react';
import { StyledBox } from "@/ui/Box";
import { Typography } from '@/ui/Typography/styles/Typography';
import { EditFillIcon } from "@/svg/EditFillIcon";
import { ImageForm } from "@/ui/ImageForm/ImageForm";
import { StyledTag } from "@/ui/Tag/styled";
import { StyledButtonIcon } from "@/ui/Button/styles/StyledButtonIcon";
import { useAppTheme } from "@/hooks/useAppTheme";

export const MapParametersForm = () => {
    const theme = useAppTheme();

    const [ mapImage, setMapImage ] = useState("");

    const onChangePackImage = (file: string) => {
        setMapImage(file);
    };

    return (
        <StyledBox
            width={"100%"}
            gap="15px"
            direction="column"
        >
            <ImageForm
                fileType="image"
                onChange={ onChangePackImage }
                value={ mapImage }
            />
            <StyledBox wrap={'wrap'} gap={5}>
                <Typography>Теги: </Typography>
                <StyledTag small>Тег</StyledTag>
                <StyledButtonIcon>
                    <EditFillIcon color={ theme.colors.iconOnSecondary } size="15px" />
                </StyledButtonIcon>
            </StyledBox>
        </StyledBox>
    );
}
