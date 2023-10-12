import React, { useCallback } from 'react';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { useMapComments } from './useMapComments';
import { useUserActions } from '@/modules/user/utils/useUserActions';
import { StyledBox } from '@/ui/Box';
import { Display } from '@/ui/Display/Display';
import { Message } from '@/ui/Message';
import { MessageSendFormContainer } from '@/ui/Message/MessagesSendForm';

type MapContentSidebarCommentsPropsType = {
    mapId: Map['id']
}
export const SidebarComments = ({ mapId }: MapContentSidebarCommentsPropsType) => {
    const {
        comments,
        commentText,
        onCommentDelete,
        onCommentAdd,
        onInputChange,
        onInputKeyDown,
    } = useMapComments();

    const {
        onUsernameClick,
    } = useUserActions();

    const onDeleteHandler = useCallback((id: number) => {
        onCommentDelete(id);
    }, [onCommentDelete]);

    const onCommentAddHandler = useCallback(() => {
        onCommentAdd(mapId);
    }, [onCommentAdd, mapId]);

    const onInputKeyDownHandler = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        onInputKeyDown(e, mapId);
    }, [onInputKeyDown, mapId]);

    const onUsernameClickHandler = useCallback((id: number) => {
        onUsernameClick(id);
    }, [onUsernameClick]);

    return (
        <StyledBox
            width={'100%'}
            grow={1}
            direction={'column'}
            overflow={'hidden'}
        >
            <Display condition={comments?.length}>
                <StyledBox
                    gap={10}
                    direction={'column'}
                    overflow={'auto'}
                    padding={'20px 0 0'}
                >
                    {comments?.map((mapComment) => (
                        <Message
                            key={mapComment.id}
                            comment={mapComment}
                            onDelete={onDeleteHandler}
                            onUsernameClick={onUsernameClickHandler}
                        />
                    ))}
                </StyledBox>
            </Display>
            <Display condition={!comments?.length}>
                <StyledBox
                    margin={'auto'}
                    textAlign={'center'}
                    opacity={0.4}
                >
                    Комментариев пока нет
                </StyledBox>
            </Display>
            <MessageSendFormContainer
                value={commentText}
                onChange={onInputChange}
                onKeyDown={onInputKeyDownHandler}
                onSendClick={onCommentAddHandler}
            />
        </StyledBox>
    );
};