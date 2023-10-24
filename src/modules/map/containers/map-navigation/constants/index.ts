import { GetMapsApiArg } from '@/api/codegen/genMouseMapsApi';
import { BookCheckFillIcon } from '@/svg/BookCheckFillIcon';
import { BookFillIcon } from '@/svg/BookFillIcon';
import { BookmarkIcon } from '@/svg/BookmarkIcon';
import { CommentFillIcon } from '@/svg/CommentFillIcon';
import { SvgIconPropsType } from '@/svg/common/types';
import { FavoriteIcon } from '@/svg/FavoriteIcon';

type NavItemsType = {
    label: string,
    IconComponent: (props: SvgIconPropsType) => JSX.Element,
    query: Partial<GetMapsApiArg>
}

export const navItems: NavItemsType[] = [
    {
        label: 'Избранные',
        IconComponent: FavoriteIcon,
        query: { isFavorite: true },
    },
    {
        label: 'Выполненные',
        IconComponent: BookCheckFillIcon,
        query: { isCompleted: true },
    },
    {
        label: 'Невыполненные',
        IconComponent: BookFillIcon,
        query: { isCompleted: false },
    },
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