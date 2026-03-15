import {
  CreateChatMessageRequest,
  CreateChatMessageResponse,
  DeleteChatMessageRequest,
  GetChatMessagesRequest,
  GetChatMessagesResponse,
} from "@/api/codegen/genMouseMapsApi";
import api from "@/api/coreMapsApi";
import { AxiosResponse } from "axios";

export const chatApi = {
  getChatMessages: async (params: GetChatMessagesRequest) => {
    const res = await api.get<GetChatMessagesRequest, AxiosResponse<GetChatMessagesResponse>>("/messages/collect", {
      params,
    });
    return res.data;
  },
  addChatMessage: async (body: CreateChatMessageRequest) => {
    const res = await api.post<CreateChatMessageRequest, AxiosResponse<CreateChatMessageResponse>>(
      "/messages/create",
      body,
    );
    return res.data;
  },
  deleteChatMessage: async (params: DeleteChatMessageRequest) => {
    const res = await api.delete<DeleteChatMessageRequest>(`/messages/remove/${params.messageId}`);
    return res.data;
  },
};
