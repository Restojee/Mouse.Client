import React from 'react';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { useMapCommentsAction } from './useMapCommentsAction';
import { useUserActions } from '@/modules/user/utils/useUserActions';
import { StyledBox } from '@/ui/Box';
import { Display } from '@/ui/Display/Display';
import { MAP_COMMENT_COLLECTION } from '@/moc/mapsMoc';
import { Message } from '@/ui/Message';
import { MessageSendFormContainer } from '@/ui/Message/MessagesSendForm';

type MapContentSidebarCommentsPropsType = {
    mapId: Map['id']
}
export const SidebarComments = ({mapId}: MapContentSidebarCommentsPropsType) => {
    const {
        onCommentDelete,
        onCommentAdd
    } = useMapCommentsAction()

    const {
        onUsernameClick
    } = useUserActions()

    const comments = MAP_COMMENT_COLLECTION;

    const onDeleteHandler = (id: number) => {
        onCommentDelete(id)
    }

    const onCommentAddHandler = () => {
        onCommentAdd(mapId)
    }

    const onUsernameClickHandler = (id: number) => {
        onUsernameClick(id)
    }

    return (
        <StyledBox
            width={'100%'}
            grow={1}
            direction={'column'}
            overflow={'hidden'}
        >
            <Display condition={comments.length}>
                <StyledBox
                    gap={10}
                    direction={'column'}
                    overflow={'auto'}
                    padding={'20px 0 0'}
                >
                    {comments.map((mapComment) => (
                        <Message
                            key={mapComment.id}
                            comment={mapComment}
                            onDelete={onDeleteHandler}
                            onUsernameClick={onUsernameClickHandler}
                        />
                    ))}
                </StyledBox>
            </Display>
            <Display condition={!comments.length}>
                <StyledBox
                    margin={'auto'}
                    textAlign={'center'}
                    opacity={0.4}
                >
                    Комментариев пока нет
                </StyledBox>
            </Display>
            <MessageSendFormContainer
                onSendMessage={ onCommentAddHandler}
            />
        </StyledBox>
    );
};