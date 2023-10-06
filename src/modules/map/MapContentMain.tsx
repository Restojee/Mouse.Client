import React from 'react';
import { Map } from "@/api/codegen/genMouseMapsApi";
import {
    StyledMapContentMain,
    StyledMapContentNoteForm,
    StyledMiniMapImageContainer,
    StyledMiniMapImagesContainer
} from "@/modules/map/styled";
import { Typography } from "@/ui/Typography/styles/Typography";
import { IconButton } from "@/ui/Button/IconButton";
import { CopyIcon } from "@/svg/CopyIcon";
import { StyledMapContentPreview } from "@/ui/Messages/styled";
import {
    StyledScrollContainer,
    StyledScrollWrapper
} from "@/ui/ScrollContainer/ScrollContainer";
import {
    StyledTag,
    StyledMapContentTags,
    StyledMapContentHeader,
    StyledMapContentTitle,
    StyledMapContentCounters,
    StyledMapContentCounter
} from "@/ui/Tag/styled";
import { MAP_TAG_COLLECTION } from "@/moc/mapsMoc";
import { CloseIcon } from "@/svg/CloseIcon";
import { EditFillIcon} from "@/svg/EditFillIcon";
import { UsersIcon } from "@/svg/UsersIcon";
import { BookCheckIcon } from "@/svg/BookCheckIcon";
import { CommentIcon } from "@/svg/CommentIcon";
import { useAppTheme } from "@/hooks/useAppTheme";
import Image from "next/image";
import { CommonUtils } from "@/common/utils";
import { MiniMapImages } from "@/modules/map/MiniMapImages";
import { StyledBox } from "@/ui/Box/styles/StyledBox";

type PropsType = {
    messages: any,
    user: any,
    date: string,
    map: Map
}
export const MapContentMain = (props: Partial<PropsType>) => {
    const theme = useAppTheme();

    return (
        <StyledMapContentMain>
            <StyledMapContentHeader>
                <StyledMapContentTitle>
                    <Typography addSize="18px">!map {props.map?.name}</Typography>
                    <IconButton opacity="0.6">
                        <CopyIcon />
                    </IconButton>
                </StyledMapContentTitle>
                <StyledMapContentCounters>
                    { MAP_ADDITIONAL_INFO_COLLECTION?.map((info, index) => (
                        <StyledMapContentCounter
                            key={ index }
                            gap="5px"
                            align="center"
                            title={ info.title }
                        >
                            { info.icon }
                            <Typography>{ info.count}</Typography>
                        </StyledMapContentCounter>
                    )) }
                </StyledMapContentCounters>
            </StyledMapContentHeader>
            <StyledMapContentPreview
                bgColor={ theme.colors.mapBackground }
                maxHeight="400px"
                height="100%"
            >
                <Image src={ CommonUtils.getMapImageLink(props.map?.image) } width={ 800 } height={ 400 } alt="map" />
            </StyledMapContentPreview>
            <StyledBox maxWidth={'100%'} overflow={"auto"}>
                <MiniMapImages/>
            </StyledBox>
            <StyledMapContentTags>
                { MAP_TAG_COLLECTION?.map(({ name, id }) => (
                    <StyledTag key={ id } bgColor={ theme.colors.primaryLighter }>
                        <Typography isEllipsis>{ name }</Typography>
                        <IconButton isAdmin>
                            <CloseIcon />
                        </IconButton>
                    </StyledTag>
                ))}
                <IconButton>
                    <EditFillIcon color={ theme.colors.brandColor } />
                </IconButton>
            </StyledMapContentTags>
            <StyledMapContentNoteForm
                placeholder="Нажмите, чтобы написать заметку..."
            />
        </StyledMapContentMain>
    );
}

export const MAP_ADDITIONAL_INFO_COLLECTION = [
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
