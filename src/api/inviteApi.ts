import {
  GetInviteCollectResponse,
} from "@/api/codegen/genMouseMapsApi";
import api from "@/api/coreMapsApi";
import { AxiosResponse } from "axios";

export const inviteApi = {
  getInviteToken: async () => {
    const res = await api.get<null, AxiosResponse<GetInviteCollectResponse>>("/api/invites/collect");
    return res.data;
  },
};
