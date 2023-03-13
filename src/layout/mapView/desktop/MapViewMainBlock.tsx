import React from 'react';
import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { Typography } from "@/ui/Typography/styles/Typography";
import { IconButton } from "@/ui/Button/IconButton";
import { CopyIcon } from "@/svg/CopyIcon";
import noneImage from "@/assets/images/noneImage.jpg";
import { StyledTag, StyledTagsContainer } from "@/ui/Tag/styled";
import { CloseIcon } from "@/svg/CloseIcon";
import { EditFillIcon } from "@/svg/EditFillIcon";
import { useTheme } from "styled-components";
import { DefaultTheme } from "@/layout/theme/constants";
import { StyledScrollContainer, StyledScrollWrapper } from "@/ui/ScrollContainer/ScrollContainer";
import { StyledMapViewMainBlock, StyledMapViewTextarea } from "@/layout/mapView/styled";
import { UsersIcon } from "@/svg/UsersIcon";
import { BookCheckIcon } from "@/svg/BookCheckIcon";
import { CommentIcon } from "@/svg/CommentIcon";
import { StyledImageContainer } from "@/ui/Messages/styled";
import { mapTags } from "@/moc/mapsMoc";

export const MapViewMainBlock = () => {

    const theme = useTheme() as typeof DefaultTheme

    return (
        <StyledMapViewMainBlock>
            <StyledBox align="center" justify="space-between">
                <StyledBox align="center">
                    <Typography addSize="18px">!map 123456</Typography>
                    <IconButton opacity="0.6">
                        <CopyIcon />
                    </IconButton>
                </StyledBox>
                <StyledBox gap="15px" align="center" opacity="0.6">
                    {mapViewInfoArray.map(({ icon, title, count }, index) => (
                        <StyledBox key={index} gap="5px" align="center" title={title}>
                            {icon}
                            <Typography>{count}</Typography>
                        </StyledBox>
                    ))}
                </StyledBox>
            </StyledBox>
            <StyledImageContainer
                bgColor={theme.colors.mapBackground}
                maxHeight="400px"
                height="100%"
            >
                <img src={noneImage.src} />
            </StyledImageContainer>
            <StyledScrollWrapper slider>
                <StyledScrollContainer>
                    <StyledBox>
                        {/*<MiniMapImages*/}
                        {/*    miniMapActiveId={miniMapActiveId}*/}
                        {/*    setMiniMapActiveId={(value) => setMiniMapActiveId(value)}*/}
                        {/*    activeMapId={activeMapId}*/}
                        {/*    setActiveImage={setActiveImage}*/}
                        {/*/>*/}
                    </StyledBox>
                </StyledScrollContainer>
            </StyledScrollWrapper>
            <StyledTagsContainer>
                {mapTags.map(({ label, id }) => (
                    <StyledTag key={id} bgColor={theme.colors.primaryLighter}>
                        <Typography isEllipsis>{label}</Typography>
                        <IconButton isAdmin>
                            <CloseIcon />
                        </IconButton>
                    </StyledTag>
                ))}
                <IconButton>
                    <EditFillIcon color={theme.colors.brandColor} />
                </IconButton>
            </StyledTagsContainer>
            <StyledMapViewTextarea placeholder="Нажмите, чтобы написать заметку..." />
        </StyledMapViewMainBlock>
    );
};

export const mapViewInfoArray = [
    {
        icon: <UsersIcon />,
        count: 12,
        title: 'Посещений',
    },
    {
        icon: <BookCheckIcon />,
        count: 3,
        title: 'Выполнений',
    },
    {
        icon: <CommentIcon />,
        count: 5,
        title: 'Комментариев',
    },
];

