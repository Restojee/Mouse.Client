import noneImage from '../../../assets/images/noneImage.jpg';
import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { Avatar } from "@/layout/avatar/Avatar";
import { useTheme } from "styled-components";
import { DefaultTheme } from "@/layout/theme/constants";
import { StyledMobileMapDrawer } from "@/layout/mapView/mobile/styled";
import {
    StyledMapViewSidebarBlockPanel, StyledMapViewSidebarBlockPanelIcons,
    StyledMapViewTextarea,
    StyledMobileMapViewContainer,
    StyledMobileMapViewMainBlock,
    StyledMobileMapViewSidebarBlock
} from '../styled';
import { Typography } from "@/ui/Typography/styles/Typography";
import { IconButton } from '@/ui/Button/IconButton';
import { CopyIcon } from "@/svg/CopyIcon";
import { StyledImageContainer } from '@/ui/Messages/styled';
import { StyledScrollContainer, StyledScrollWrapper } from '@/ui/ScrollContainer/ScrollContainer';
import { MiniMapImages } from "@/layout/mapView/MiniMapImages";
import { StyledTag, StyledTagsContainer } from '@/ui/Tag/styled';
import { mapComments, mapTags } from "@/moc/mapsMoc";
import { EditFillIcon } from "@/svg/EditFillIcon";
import Message from "@/ui/Messages/Messages";
import MessageSendFormContainer from "@/ui/Messages/MessagesSendForm";
import Image from "next/image";
import { panelIconsArray } from "@/layout/mapView/desktop/DesktopMapView";
import { mapViewInfoArray } from "@/layout/mapView/desktop/MapViewMainBlock";

type PropsType = {
    messages: any,
    user: any,
    date: string
}

export const MobileMapView = (props: PropsType) => {

    const theme = useTheme() as typeof DefaultTheme

    return (
        <StyledMobileMapViewContainer>
            <StyledMobileMapDrawer
                padding="30px 20px 10px 20px"
            />
            <StyledMobileMapViewMainBlock gap="30px">
                <StyledBox align="center" gap="20px">
                    <Avatar border
                            size="70px"
                            src="https://i.imgur.com/P11sXfz.png"
                    />
                    <StyledBox direction="column">
                        <Typography isLink isEllipsis addSize="4px" fontWeight="bold">
                            { props.user }
                        </Typography>
                        <Typography>{ props.date }</Typography>
                    </StyledBox>
                </StyledBox>
                <StyledBox align="center" justify="space-between">
                    <StyledBox align="center">
                        <Typography addSize="18px">!map 123123</Typography>
                        <IconButton opacity="0.6">
                            <CopyIcon />
                        </IconButton>
                    </StyledBox>
                    <StyledBox gap="15px" align="center" opacity="0.6">
                        { mapViewInfoArray.map(({ icon, title, count }, index) => (
                            <StyledBox key={ index } gap="5px" align="center" title={ title }>
                                { icon }
                                <Typography>{ count }</Typography>
                            </StyledBox>
                        )) }
                    </StyledBox>
                </StyledBox>
                <StyledImageContainer bgColor={ theme.colors.mapBackground } maxHeight="400px">
                    <Image alt={ 'map screen' } src={ noneImage } />
                </StyledImageContainer>
                <StyledScrollWrapper slider>
                    <StyledScrollContainer>
                        <StyledBox>
                            <MiniMapImages
                            />
                        </StyledBox>
                    </StyledScrollContainer>
                </StyledScrollWrapper>
                <StyledTagsContainer>
                    { mapTags.map(({ label, id }) => (
                        <StyledTag small key={ id } bgColor={ theme.colors.primaryLighter }>
                            <Typography isEllipsis>{ label }</Typography>
                        </StyledTag>
                    )) }
                    <IconButton>
                        <EditFillIcon color={ theme.colors.brandColor } />
                    </IconButton>
                </StyledTagsContainer>
                <StyledMapViewTextarea placeholder="Нажмите, чтобы написать заметку..." />
            </StyledMobileMapViewMainBlock>
            <StyledMobileMapViewSidebarBlock gap="0">
                <StyledMapViewSidebarBlockPanel gap="0">
                    { panelIconsArray.map(({ icon }, index) => (
                        <StyledMapViewSidebarBlockPanelIcons key={ index }>
                            { icon(theme) }
                        </StyledMapViewSidebarBlockPanelIcons>
                    )) }
                </StyledMapViewSidebarBlockPanel>
                <StyledBox padding="20px">
                    <Typography fontWeight="bold">Все комментарии</Typography>
                </StyledBox>
                <StyledBox>
                    <StyledScrollWrapper maxHeight="70vh">
                        <StyledScrollContainer padding=" 10px 20px">
                            { mapComments.map((obj) => (
                                <Message key={ obj.id } { ...obj } />
                            )) }
                        </StyledScrollContainer>
                    </StyledScrollWrapper>
                </StyledBox>
                <MessageSendFormContainer />
            </StyledMobileMapViewSidebarBlock>
        </StyledMobileMapViewContainer>
    )
}