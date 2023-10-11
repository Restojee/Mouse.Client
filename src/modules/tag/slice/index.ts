import { TAGS_COLLECTION } from '@/moc/mapsMoc';
import { RootState } from '@/store';
import { ModalType, TagsStateType } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TagsStateType = {
    modalType: null,
    tagsList: TAGS_COLLECTION,
};

const slice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        closeTagModal: (state) => {
            state.modalType = null;
        },
        openTagModal: (state, action: PayloadAction<ModalType>) => {
            state.modalType = action.payload;
        },
    },
});

export const selectTagModalType = (state: RootState) => state.tags.modalType;
export const selectTags = (state: RootState) => state.tags.tagsList;


export const {
    closeTagModal,
    openTagModal
} = slice.actions;

export const tagsReducer = slice.reducer;