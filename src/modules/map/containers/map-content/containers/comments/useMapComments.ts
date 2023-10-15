import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    addMapCommentsThunk,
    getMapCommentsThunk,
    selectMapComments,
    setComments,
} from './slice';
import { useRouter } from 'next/router';
import { Map } from '@/api/codegen/genMouseMapsApi';

export const useMapComments = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const comments = useAppSelector(selectMapComments);

    const [commentText, setCommentText] = useState('');

    const { mapId } = router.query;

    const onCommentAdd = useCallback(async (mapId: Map['id']): Promise<void> => {
        const messageText = String(commentText).trim();

        if (messageText.length) {
            const res = await dispatch(addMapCommentsThunk({ mapId, text: commentText }));

            if (res.payload) {
                setCommentText('');
            }
        }
    }, [commentText]);

    const clearComments = useCallback(() => {
        dispatch(setComments([]));
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
        dispatch(getMapCommentsThunk({ mapId: Number(mapId) }));
    }, []);

    useEffect(() => {
        if (mapId) {
            const id = setInterval(() => {
                dispatch(getMapCommentsThunk({ mapId: Number(mapId) }));
            }, 5000);
            return () => {
                clearInterval(id);
            };
        }

    }, [mapId]);

    return {
        comments,
        commentText,
        onCommentAdd,
        onInputChange,
        onInputKeyDown,
        clearComments,
    };
};

