import axios, {
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

import { useAuthStore } from "@/features/auth/store/auth.store";

if (!BASE_URL) {
    throw new Error("BASE_URL is not defined in the environment variables.");
}

const options: AxiosRequestConfig = {
    baseURL: BASE_URL,
    timeout: 10000,
};

export const apiClient = axios.create(options);

const plainApiClient = axios.create(options);

declare module "axios" {
    interface AxiosRequestConfig {
        unprotected?: boolean;
        _retry?: boolean;
    }
}

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

export const refreshAccessToken = async (): Promise<string> => {
    try {
        const refresh = useAuthStore.getState().refreshToken;
        const response = await plainApiClient({
            method: "POST",
            url: "/api/auth/refresh",
            data: {
                refresh_token: refresh,
            },
        });

        if (response.status === 200) {
            const newAccessToken = response.data.access_token;
            const newRefreshToken = response.data.refresh_token;

            useAuthStore.getState().setAccessToken(newAccessToken);
            useAuthStore.getState().setRefreshToken(newRefreshToken);

            return newAccessToken;
        }
        throw new Error("Failed to refresh access token");
    } catch (error) {
        useAuthStore.getState().clearTokens();
        throw error;
    }
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && !config.unprotected) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
    config.headers.set("ngrok-skip-browser-warning", "1");
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig;

        const is401 = error.response?.status === 401;
        const alreadyRetried = originalRequest._retry;
        const isProtected = !originalRequest.unprotected;

        if (!is401 || alreadyRetried || !isProtected) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    if (originalRequest.headers) {
                        originalRequest.headers.set("Authorization", `Bearer ${token}`);
                    }
                    return apiClient(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const newToken = await refreshAccessToken();
            processQueue(null, newToken);
            return apiClient(originalRequest);
        } catch (error) {
            processQueue(error, null);
            return Promise.reject(error);
        } finally {
            isRefreshing = false;
        }
    },
);

apiClient.interceptors.request.use((req) => {
    console.log("REQUEST DATA:", req.data);
    const queryParams = new URLSearchParams(req.params).toString();
    console.log("REQUEST URL:", `${req.baseURL}${req.url}?${queryParams}`);
    return req;
});

apiClient.interceptors.response.use((res) => {
    console.log("RESPONSE DATA:", res.data);
    return res;
});
