import { Comment, Tag, User } from '@/api/codegen/genMouseMapsApi';
import { Map } from '@/api/codegen/genMouseMapsApi';

export const USER_COLLECTION: User[]  = [
    {
        id: 1,
        username: 'Code001',
        avatar: 'https://i.imgur.com/7E4z972.jpg',
    }
]

export const mapTags: Tag[] = [
    {
        id: 1,
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
        name: 'Карта 1',
        image: '',
        description: 'awdawdwa',
        tags: mapTags,
    },
];

export const MAP_TAG_COLLECTION = [
    {
        'id': 0,
        'name': 'Nickname',
        'date': '01.01.2020',
        'avatar': 'https://i.imgur.com/P11sXfz.png',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa.',
    },
    {
        'id': 1,
        'name': 'Nickname',
        'date': '01.01.2020',
        'avatar': 'https://i.imgur.com/P11sXfz.png',
        'text': 'Lorem ipsum dolor sit amet',
    },
    {
        'id': 2,
        'name': 'Nickname',
        'date': '01.01.2020',
        'avatar': 'https://i.imgur.com/P11sXfz.png',
        'text': 'Lorem ipsum dolor sit amet',
    },
    {
        'id': 3,
        'name': 'Nickname',
        'date': '01.01.2020',
        'avatar': 'https://i.imgur.com/P11sXfz.png',
        'text': 'Lorem ipsum dolor sit amet',
    },

    {
        'id': 4,
        'name': 'Nickname',
        'date': '01.01.2020',
        'avatar': 'https://i.imgur.com/P11sXfz.png',
        'text': 'Lorem ipsum dolor sit amet',
    },
];

export const MAP_COMMENT_COLLECTION: Comment[] = [
    {
        id: 1,
        user: USER_COLLECTION[0],
        text: 'Lorem ipsum dolor sit amet',
    },
];
