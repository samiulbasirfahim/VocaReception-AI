import { mmkvStorage } from "@/lib/mmkv-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    clearTokens: () => void;

    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;

    isHydrated: boolean;
    setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,

            setAccessToken: (accessToken: string) => set({ accessToken }),
            setRefreshToken: (refreshToken: string) => set({ refreshToken }),

            clearTokens: () => set({ accessToken: null, refreshToken: null }),
            isHydrated: false,
            isLoggedIn: false,
            setHydrated: (value) => set({ isHydrated: value }),
        }),
        {
            name: "auth-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },

            storage: createJSONStorage<{
                refreshToken: string | null;
            }>(() => mmkvStorage),
            partialize(state) {
                return {
                    refreshToken: state.refreshToken,
                };
            },
        },
    ),
);
