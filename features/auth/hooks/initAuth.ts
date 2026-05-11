import { useAuthStore } from "@/features/auth/store/auth.store";
import { refreshAccessToken } from "@/features/common/utils/apiClient";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

export function useInitAuth() {
    const hydrated = useAuthStore((x) => x.isHydrated);
    const refreshToken = useAuthStore((x) => x.refreshToken);
    const [initializedAuth, setInitializedAuth] = useState<boolean>(false);

    useEffect(() => {
        if (hydrated) {
            if (!refreshToken) {
                setInitializedAuth(true);
                SplashScreen.hideAsync();
                return;
            }
            refreshAccessToken()
                .then(() => {
                    console.log("Access token refreshed successfully.");
                })
                .catch((error) => {
                    console.error("Failed to refresh access token:", error);
                })
                .finally(() => {
                    setInitializedAuth(true);
                    SplashScreen.hideAsync();
                });
        }
    }, [hydrated]);

    return {
        initializedAuth,
    };
}
