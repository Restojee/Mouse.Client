import React, { useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuth } from '@/modules/auth/slice';
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
        onCommentAdd,
        onInputChange,
        onInputKeyDown,
        clearComments,
    } = useMapComments();

    const {
        onUsernameClick,
    } = useUserActions();

    const isAuth = useAppSelector(selectIsAuth);

    const scrollToBottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottomHandler = (isNotSmooth?: boolean) => {
        const ref = scrollToBottomRef.current;
        const timeout = isNotSmooth ? 0 : 200

        if (ref) {
            setTimeout(() => {
                ref.scrollTo({
                    top: ref.scrollHeight ,
                    behavior: isNotSmooth ? undefined : 'smooth',
                });
            }, timeout)
        }
    };

    const onFocusHandler = useCallback(async () => {
        scrollToBottomHandler();
    }, [onCommentAdd, mapId]);

    const onCommentAddHandler = useCallback(async () => {
        await onCommentAdd(mapId);
    }, [onCommentAdd, mapId]);

    const onInputKeyDownHandler = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        onInputKeyDown(e, mapId);
    }, [onInputKeyDown, mapId]);

    const onUsernameClickHandler = useCallback((id: number) => {
        onUsernameClick(id);
    }, [onUsernameClick]);

    useEffect(() => {
        scrollToBottomHandler(true);
    }, [comments?.length]);

    useEffect(() => {
        scrollToBottomHandler();
        return () => {
            clearComments()
        }
    }, []);

    return (
        <StyledBox
            width={'100%'}
            grow={1}
            direction={'column'}
            overflow={'hidden'}
        >
            <Display condition={comments?.length}>
                <StyledBox
                    ref={scrollToBottomRef}
                    gap={10}
                    direction={'column'}
                    overflow={'auto'}
                    padding={'20px 0 0'}
                >
                    {comments?.map((mapComment) => (
                        <Message
                            key={mapComment.id}
                            comment={mapComment}
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
                disabled={!isAuth}
                value={commentText}
                onFocus={onFocusHandler}
                onChange={onInputChange}
                onKeyDown={onInputKeyDownHandler}
                onSendClick={onCommentAddHandler}
            />
        </StyledBox>
    );
};