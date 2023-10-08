import React from 'react';
import { BookCheckIcon } from '@/svg/BookCheckIcon';
import { CommentIcon } from '@/svg/CommentIcon';
import { UsersIcon } from '@/svg/UsersIcon';

export type MapInfoType = 'view' | 'complete' | 'comments';

type MapAdditionalInfoType = {
    icon: React.ReactNode;
    label: MapInfoType;
    title: string;
}

export const MAP_ADDITIONAL_INFO: MapAdditionalInfoType[] = [
    {
        icon: <UsersIcon/>,
        label: 'view',
        title: 'Посещений',
    },
    {
        icon: <BookCheckIcon/>,
        label: 'complete',
        title: 'Выполнений',
    },
    {
        icon: <CommentIcon/>,
        label: 'comments',
        title: 'Комментариев',
    },
];
