import { Comment, Map } from '@/api/codegen/genMouseMapsApi';

export const useMapCommentsAction = () => {
    const onCommentDelete = (id: Comment['id']): void => {
        alert('удаление коммента пока не работает')
    }

    const onCommentAdd = (mapId: Map['id']): void => {
        alert('добавление коммента пока не работает')
    }

    return {
        onCommentAdd,
        onCommentDelete
    };
};

