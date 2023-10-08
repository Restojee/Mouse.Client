import React, { useCallback, useState } from 'react';
import { Comment, Map } from '@/api/codegen/genMouseMapsApi';

export const useMapCommentsAction = () => {
    const [commentText, setCommentText] = useState('')

    const onCommentAdd = useCallback((mapId: Map['id']): void => {
        const messageText = String(commentText).trim();

        if (messageText.length) {
            alert('добавление коммента пока не работает');
            setCommentText('');
        }
    }, [commentText])

    const onCommentDelete = useCallback((id: Comment['id']): void => {
        alert('удаление коммента пока не работает')
    }, [])

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value;
        setCommentText(text);
    };

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, mapId: Map['id']): void => {
        if (e.ctrlKey || e.shiftKey) {
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault()
            onCommentAdd(mapId);
        }
    };

    return {
        commentText,
        onCommentAdd,
        onCommentDelete,
        onInputChange,
        onInputKeyDown
    };
};

