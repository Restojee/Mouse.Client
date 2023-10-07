import React from 'react';
import { StyledBox } from '@/ui/Box';
import { Display } from '@/ui/Display/Display';
import { MAP_COMMENT_COLLECTION } from '@/moc/mapsMoc';
import { Message } from '@/ui/Message';
import { MessageSendFormContainer } from '@/ui/Message/MessagesSendForm';

export const MapContentSidebarComments = () => {
    const comments = MAP_COMMENT_COLLECTION;

    const onDeleteHandler = (id: number) => {
        alert('удаление коммента пока не работает')
    }

    const onAuthorClickHandler = (id: number) => {
        alert('просмотр статистики юзера пока не работает')
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
                            onAuthorClick={onAuthorClickHandler}
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
            <MessageSendFormContainer/>
        </StyledBox>
    );
};