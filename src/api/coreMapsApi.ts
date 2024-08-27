import axios, { InternalAxiosRequestConfig } from "axios";
import { accessTokenProvider } from "@/services";

export const api = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    Authorization: "",
  },
});

const attachTokenToRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = accessTokenProvider.getToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(attachTokenToRequest);

export default api;
