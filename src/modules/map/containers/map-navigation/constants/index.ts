import { NavigationQueryType } from '@/modules/map/containers/map-navigation/hooks/useMapNavigation';
import { BookCheckFillIcon } from '@/svg/BookCheckFillIcon';
import { BookFillIcon } from '@/svg/BookFillIcon';
import { BookmarkIcon } from '@/svg/BookmarkIcon';
import { CommentFillIcon } from '@/svg/CommentFillIcon';
import { SvgIconPropsType } from '@/svg/common/types';
import { FavoriteIcon } from '@/svg/FavoriteIcon';

type NavItemsType = {
    label: string,
    IconComponent: (props: SvgIconPropsType) => JSX.Element,
    query: NavigationQueryType
}

export const navItems: NavItemsType[] = [
    {
        label: 'Избранные',
        IconComponent: FavoriteIcon,
        query: 'favorites',
    },
    {
        label: 'Выполненные',
        IconComponent: BookCheckFillIcon,
        query: 'completed',
    },
    // {
    //     label: 'Невыполненные',
    //     IconComponent:  BookFillIcon,
    //     query: ''
    // },
    // {
    //     label: 'Прокомментированные',
    //     IconComponent:  CommentFillIcon,
    //     query: ''
    // },
    // {
    //     label: 'Карты с заметкой',
    //     IconComponent:  BookmarkIcon,
    //     query: ''
    // },

];