import { Comment } from '@/api/codegen/genMouseMapsApi';

export type ChatStateType = {
    messages: Comment[];
    isCreateFetching: boolean;
    isMessagesInitialized: boolean;
}