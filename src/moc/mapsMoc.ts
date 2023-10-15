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
    },
    {
        id: 3,
        user: {
            id: 1,
            username: 'Code001',
        },
        name: '@123456',
        image: '',
        description: 'awdawdwa',
        tags: TAGS_COLLECTION,
    },
    {
        id: 4,
        user: {
            id: 1,
            username: 'Code001',
        },
        name: 'Карта 1',
        image: '',
        description: 'awdawdwa',
        tags: TAGS_COLLECTION,
    },
    {
        id: 5,
        user: {
            id: 1,
            username: 'Code001',
        },
        name: '@123456',
        image: '',
        description: 'awdawdwa',
        tags: TAGS_COLLECTION,
    },
    {
        id: 6,
        user: {
            id: 1,
            username: 'Code001',
        },
        name: '@123456',
        image: '',
        description: 'awdawdwa',
        tags: TAGS_COLLECTION,
    },
    {
        id: 7,
        user: {
            id: 1,
            username: 'Code001',
        },
        name: '@123456',
        image: '',
        description: 'awdawdwa',
        tags: TAGS_COLLECTION,
    },
];

export const MAP_COMMENT_COLLECTION: Comment[] = [
    {
        id: 1,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 2,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 3,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 4,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 5,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 6,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 7,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 8,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 9,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 10,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 11,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
    {
        id: 12,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
];
