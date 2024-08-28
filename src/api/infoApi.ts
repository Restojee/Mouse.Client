import { RemoveTipApiArg } from "@/api/codegen/genMouseMapsApi";
import { AxiosResponse } from "axios";
import api from "@/api/coreMapsApi";
import * as apiTypes from "@/api/codegen/genMouseMapsApi";

export const infoApi = {
  getInfo: async (params: apiTypes.GetTipPaginateApiArg) => {
    const res = await api.get<apiTypes.GetTipPaginateApiArg, AxiosResponse<apiTypes.GetTipApiResponse>>(
      `/tips/collect`,
      { params },
    );
    res.data.records = res.data.records.reverse();
    return res.data;
  },
  createInfo: async (body: apiTypes.CreateTipApiArg) => {
    const res = await api.post<apiTypes.CreateTipRequest, AxiosResponse<apiTypes.CreateTipApiResponse>>(
      `/tips/create`,
      body,
    );
    return res.data;
  },
  updateInfo: async (body: apiTypes.UpdateTipApiArg) => {
    const res = await api.put<apiTypes.UpdateTipRequest, AxiosResponse<apiTypes.UpdateTipApiResponse>>(
      `/tips/update`,
      body,
    );
    return res.data;
  },
  deleteInfo: async (params: RemoveTipApiArg) => {
    const res = await api.delete<apiTypes.RemoveTipApiArg, AxiosResponse<apiTypes.RemoveTipApiResponse>>(
      `/tips/delete/${params.tipId}`,
      { params },
    );
    return res.data;
  },
};
