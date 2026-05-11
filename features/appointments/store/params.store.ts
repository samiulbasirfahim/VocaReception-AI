import { mmkvStorage } from "@/lib/mmkv-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import dayjs from "dayjs";

interface CalendarState {
    // Persisted strings
    startDate: string | null;
    endDate: string | null;

    // Actions
    setRange: (start: any, end: any) => void;
    clearRange: () => void;

    // Hydration state (matching your AuthStore pattern)
    isHydrated: boolean;
    setHydrated: (value: boolean) => void;

    // Computed helper (Not persisted)
    getDates: () => { start: Date | null; end: Date | null };
}

export const useCalendarStore = create<CalendarState>()(
    persist(
        (set, get) => ({
            startDate: null,
            endDate: null,
            isHydrated: false,

            setRange: (start, end) =>
                set({
                    startDate: start ? dayjs(start).format("YYYY-MM-DD") : null,
                    endDate: end ? dayjs(end).format("YYYY-MM-DD") : null,
                }),
            clearRange: () => set({ startDate: null, endDate: null }),

            setHydrated: (value) => set({ isHydrated: value }),

            getDates: () => ({
                start: get().startDate ? dayjs(get().startDate).toDate() : null,
                end: get().endDate ? dayjs(get().endDate).toDate() : null,
            }),
        }),
        {
            name: "calendar-storage",
            storage: createJSONStorage(() => mmkvStorage),

            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },

            partialize: (state) => ({
                startDate: state.startDate,
                endDate: state.endDate,
            }),
        },
    ),
);
