import { StyledBox } from '@/ui/Box/styles/StyledBox';
import React, { useEffect, useRef } from 'react';
import { Typography } from "@/ui/Typography/styles/Typography";
import { Avatar } from "@/layout/avatar/Avatar";
import { MapViewMainBlock } from "@/layout/mapView/desktop/MapViewMainBlock";
import {
    StyledMapViewContainer,
    StyledMapViewSidebarBlock,
    StyledMapViewSidebarBlockPanel, StyledMapViewSidebarBlockPanelIcons
} from "@/layout/mapView/styled";
import { useTheme } from "styled-components";
import { DefaultTheme } from "@/layout/theme/constants";
import { AddImageIcon } from "@/svg/AddImageIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { OutIcon } from "@/svg/OutIcon";
import { TrashIcon } from "@/svg/TrashIcon";
import { StyledScrollContainer, StyledScrollWrapper } from "@/ui/ScrollContainer/ScrollContainer";
import Message from "@/ui/Messages/Messages";
import MessageSendFormContainer from "@/ui/Messages/MessagesSendForm";
import { mapComments } from "@/moc/mapsMoc";

type PropsType = {
    messages: any,
    user: any,
    date: string
}
export const DesktopMapView = (props: PropsType) => {

    const theme = useTheme() as typeof DefaultTheme
    const scrollToBottomRef = useRef<HTMLDivElement>(null)

    const scrollToBottomHandler = () => {
        const ref = scrollToBottomRef.current as HTMLDivElement
        ref.scrollTo({
            top: ref.scrollHeight,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        scrollToBottomHandler();
    }, [props.messages.length]);

    //
    return (
        <StyledMapViewContainer>
            <MapViewMainBlock />
            <StyledMapViewSidebarBlock>
                <StyledBox
                    direction={"column"}
                    align="center"
                    gap="20px"
                    margin="0 30px 20px 30px"
                >
                    <Avatar border size="70px" image="https://i.imgur.com/P11sXfz.png" />
                    <StyledBox direction="column">
                        <Typography isLink isEllipsis addSize="4px" fontWeight="bold">
                            { props.user }
                        </Typography>
                        <Typography>{ props.date }</Typography>
                    </StyledBox>
                </StyledBox>
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
                <StyledScrollWrapper>
                    <StyledScrollContainer
                        ref={ scrollToBottomRef }
                        padding={ window.innerWidth < theme.sizes.media.large ? '0' : '10px 15px' }
                    >
                        { mapComments.map((el) => (
                            <Message key={ el.id } { ...el } />
                        )) }
                    </StyledScrollContainer>
                </StyledScrollWrapper>
                <MessageSendFormContainer />
            </StyledMapViewSidebarBlock>
        </StyledMapViewContainer>
    );
}

export const panelIconsArray = [
    { icon: (theme: typeof DefaultTheme) => <AddImageIcon size="30px" color={ theme.colors.primary } />, },
    { icon: (theme: typeof DefaultTheme) => <FavoriteIcon size="30px" color={ theme.colors.primary } />, },
    { icon: (theme: typeof DefaultTheme) => <OutIcon size="30px" color={ theme.colors.primary } />, },
    { icon: (theme: typeof DefaultTheme) => <TrashIcon size="30px" color={ theme.colors.primary } />, },
];