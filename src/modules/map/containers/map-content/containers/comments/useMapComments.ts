import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    addMapCommentsThunk,
    getMapCommentsThunk,
    selectMapComments,
} from '@/modules/map/containers/map-content/containers/comments/slice';
import { useRouter } from 'next/router';
import { Comment, Map } from '@/api/codegen/genMouseMapsApi';

export const useMapComments = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const comments = useAppSelector(selectMapComments);

    const [commentText, setCommentText] = useState('');

    const { id } = router.query;

    const onCommentAdd = useCallback((mapId: Map['id']): void => {
        const messageText = String(commentText).trim();

        if (messageText.length) {
            dispatch(addMapCommentsThunk({ mapId, text: commentText }));
            setCommentText('');
        }
    }, [commentText]);

    const onCommentDelete = useCallback((id: Comment['id']): void => {
        alert('удаление коммента пока не работает');
    }, []);

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value;
        setCommentText(text);
    };

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, mapId: Map['id']): void => {
        if (e.ctrlKey || e.shiftKey) {
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            onCommentAdd(mapId);
        }
    };

    useEffect(() => {
        const mapId = Number(id);
        if (id) {
            dispatch(getMapCommentsThunk({ mapId }));
        }
    }, [id]);

    return {
        comments,
        commentText,
        onCommentAdd,
        onCommentDelete,
        onInputChange,
        onInputKeyDown,
    };
};

