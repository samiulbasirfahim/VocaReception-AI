import { create } from "zustand";

type StoreState = {
    isLoggedIn: boolean;
    refresh_token: string | null;
    access_token: string | null;

    setRefreshToken: (token: string) => void;

    clearStore: () => void;
};

export const useAuthStore = create<StoreState>()((set) => ({
    isLoggedIn: false,
    refresh_token: null,
    access_token: null,

    setRefreshToken: (refresh_token) => {
        return set(() => ({ refresh_token: refresh_token, isLoggedIn: true }));
    },

    clearStore: () => set(() => ({ refresh_token: null, access_token: null })),
}));
