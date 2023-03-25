import {StyledMapContentSidebarComments, StyledMapContentSidebarCommentsHeader} from "@/modules/map/styled";
import { Typography } from "@/ui/Typography/styles/Typography";
import {
    StyledScrollContainer,
    StyledScrollWrapper
} from "@/ui/ScrollContainer/ScrollContainer";
import { MAP_COMMENT_COLLECTION} from "@/moc/mapsMoc";
import { Message } from "@/ui/Messages/Messages";
import { MessageSendFormContainer } from "@/ui/Messages/MessagesSendForm";
import React from "react";

export const MapContentSidebarComments = () => {
    return (
        <StyledMapContentSidebarComments>
            <StyledMapContentSidebarCommentsHeader>
                <Typography fontWeight="bold">Все комментарии</Typography>
            </StyledMapContentSidebarCommentsHeader>
            <StyledScrollWrapper>
                <StyledScrollContainer padding="10px 15px">
                    { MAP_COMMENT_COLLECTION.map((mapComment) => (
                        <Message key={ mapComment.id } { ...mapComment } />
                    )) }
                </StyledScrollContainer>
            </StyledScrollWrapper>
            <MessageSendFormContainer />
        </StyledMapContentSidebarComments>
    )
}