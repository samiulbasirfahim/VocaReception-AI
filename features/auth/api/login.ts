import { apiClient } from "@/features/common/utils/apiClient";
import { useMutation } from "@tanstack/react-query";
import { LoginPaylod, LoginResponse } from "../type/auth";
import { useAuthStore } from "../store/auth.store";
import { extractAxiosError } from "@/lib/extract-axios-error";

export function useLogin(setErr: (err: string | null) => void) {
    const setRfToken = useAuthStore((x) => x.setRefreshToken);
    const setAcToken = useAuthStore((x) => x.setAccessToken);
    return useMutation({
        mutationFn: async (data: LoginPaylod) => {
            const body = new URLSearchParams();
            body.append("username", data.username);
            body.append("password", data.password);

            return apiClient.post<LoginResponse>("/api/auth/login", body, {
                unprotected: true,
            });
        },
        onSuccess: (res) => {
            const data = res.data;
            if (data.access_token && data.refresh_token) {
                setAcToken(data.access_token);
                setRfToken(data.refresh_token);
                setErr(null);
            } else {
                setErr("Invalid response from server");
            }
        },
        onError: (err) => {
            extractAxiosError(err);
        },
    });
}
