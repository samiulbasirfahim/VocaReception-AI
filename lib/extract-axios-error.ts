import axios from "axios";

export function extractAxiosError(err: unknown): string {
    if (axios.isAxiosError(err)) {
        const backendMessage =
            err.response?.data?.message ||
            err.response?.data?.detail ||
            err.response?.data?.error;

        console.log("Login error:", {
            status: err.response?.status,
            data: err.response?.data,
            backendMessage,
        });

        return backendMessage ?? "Request failed";
    } else {
        return "Unknown error";
    }
}
