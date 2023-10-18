import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { shallowEqual } from 'react-redux';
import {
    addMapCommentsThunk,
    getMapCommentsThunk,
    selectIsCommentCreateFetching,
    selectIsCommentsInitialized,
    selectMapComments,
    setComments,
} from './slice';
import { useRouter } from 'next/router';
import { Map } from '@/api/codegen/genMouseMapsApi';

export const useMapComments = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const comments = useAppSelector(selectMapComments, shallowEqual);
    const isCommentsInitialized = useAppSelector(selectIsCommentsInitialized);
    const isCommentCreateFetching = useAppSelector(selectIsCommentCreateFetching);

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

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value;
        setCommentText(text);
    }, []);

    const onInputKeyUp = useCallback(async (e: React.KeyboardEvent<HTMLTextAreaElement>, mapId: Map['id']): Promise<void> => {
        if (e.ctrlKey || e.shiftKey) {
            return;
        }

        if (e.key === 'Enter') {
            await onCommentAdd(mapId);
        }
    }, [onCommentAdd]);

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
        clearComments,
        onInputChange,
        onInputKeyUp,
        isCommentsInitialized,
        isCommentCreateFetching,
    };
};

