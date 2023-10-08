import { Map } from '@/api/codegen/genMouseMapsApi';

export const useMap = (mapId?: Map['id']) => {
    const onAddMapComplete = () => {
        alert('добавление карты пока не работает')
    }

    const onAddMapFavorite = (): void => {
        alert('добавление карты в избранное пока не работает')
    }

    const onMapShare = (): void => {
        alert('кнопка поделиться пока не работает')
    }

    const onMapDelete = (): void => {
        alert('удаление карты пока не работает')
    }

    const onMapNameCopy = async (name: Map['name']): Promise<void> => {
        const text = `!map ${name}`

        try {
            await navigator.clipboard.writeText(text);
            alert('Скопировано!');
        } catch (error) {
            alert('Ошибка копирования');
        }
    }

    return {
        onAddMapComplete,
        onMapDelete,
        onAddMapFavorite,
        onMapShare,
        onMapNameCopy
    };
};

