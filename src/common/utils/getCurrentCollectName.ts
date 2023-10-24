import { GetMapsApiArg } from '@/api/codegen/genMouseMapsApi';

export const getCurrentCollectName = (query: Partial<GetMapsApiArg>): string => {
    if (query.isCompleted === true) {
        return 'Выполненные';
    } else if (query.isCompleted === false) {
        return 'Невыполненные';
    } else if (query.isFavorite === true) {
        return 'Избранные';
    } else {
        return 'Все карты';
    }
};