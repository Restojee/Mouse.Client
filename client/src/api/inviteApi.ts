import {
  CreateInviteCollectRequest,
  CreateInviteCollectResponse,
  GetInviteCollectResponse,
} from "@/api/codegen/genMouseMapsApi";
import api from "@/api/coreMapsApi";
import { AxiosResponse } from "axios";

export const inviteApi = {
  getInviteToken: async () => {
    const res = await api.get<null, AxiosResponse<GetInviteCollectResponse[]>>("/api/invites/collect");
    return res.data[0];
  },
  createInviteToken: async (body: CreateInviteCollectRequest) => {
    const res = await api.post<CreateInviteCollectRequest, AxiosResponse<CreateInviteCollectResponse>>(
      "/api/invites/create",
      body,
    );
    return res.data;
  },
};
