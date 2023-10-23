import { Comment } from '@/api/codegen/genMouseMapsApi';

export type MapCommentsStateType = {
    commentsList: Comment[];
    isCommentsInitialized: boolean;
    isCommentCreateFetching: boolean;
}