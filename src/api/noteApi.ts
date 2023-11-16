import {
    UpdateMapNoteRequest,
    UpdateMapNoteResponse,
} from '@/api/codegen/genMouseMapsApi';
import api from '@/api/coreMapsApi';
import { AxiosResponse } from 'axios';

export const noteApi = {
    updateNote: async (body: UpdateMapNoteRequest) => {
        const res = await api.put<UpdateMapNoteRequest, AxiosResponse<UpdateMapNoteResponse>>('/levels/set-note', body);
        return res.data;
    },
};