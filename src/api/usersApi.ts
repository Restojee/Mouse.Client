import { GetUsersApiArg, GetUsersApiResponse, UpdateUserImageRequest } from "@/api/codegen/genMouseMapsApi";
import api from "@/api/coreMapsApi";
import { AxiosResponse } from "axios";

export const usersApi = {
  getUsers: async (params: GetUsersApiArg) => {
    const res = await api.get<GetUsersApiArg, AxiosResponse<GetUsersApiResponse>>("/users/collect", { params });
    return res.data;
  },
  updateAvatar: async (arg: UpdateUserImageRequest) => {
    const formData = new FormData();
    formData.append("file", arg.file, "filename.png");

    const res = await api.post<UpdateUserImageRequest, AxiosResponse<void>>("/users/update-my-avatar", formData);
    return res.data;
  },
};
