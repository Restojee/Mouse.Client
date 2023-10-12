import axios from 'axios';
import {getSession, useSession} from "next-auth/react";

export const api = axios.create({
    baseURL: process.env.BASE_API_URL,
})

api.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
});

export default api;