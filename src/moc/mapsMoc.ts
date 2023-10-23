import { Comment, Tag, User } from '@/api/codegen/genMouseMapsApi';
import { Map } from '@/api/codegen/genMouseMapsApi';

export const USER_COLLECTION: User[]  = [
    {
        id: 1,
        username: 'Code001',
        avatar: 'https://i.imgur.com/7E4z972.jpg',
    }
]

export const TAGS_COLLECTION: Tag[] = [
    {
        id: 1,
        name: 'антигравитация',
    },
    {
        id: 2,
        name: 'лед',
    },
    {
        id: 3,
        name: 'вода',
    },
    {
        id: 4,
        name: 'сильная гравитация',
    },
    {
        id: 5,
        name: 'антигравитация',
    },
];

export const mapsData: Map[] = [
    {
        id: 1,
        user: {
            id: 1,
            username: 'Code001',
        },
        name: '@123456',
        image: '',
        description: 'awdawdwa',
        tags: TAGS_COLLECTION,
        modifiedUtcDate:'2023-10-16T06:54:58.405955',
        createdUtcDate:'2023-10-16T06:54:58.405955'
    },
    {
        id: 2,
        user: {
            id: 1,
            username: 'Code001',
        },
        name: '@123456',
        image: '',
        description: 'awdawdwa',
        tags: TAGS_COLLECTION,
        modifiedUtcDate:'2023-10-16T06:54:58.405955',
        createdUtcDate:'2023-10-16T06:54:58.405955'
    },
];
