import { apiClient } from "@/features/common/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export type CalendarContact = {
    name: string | null;
    email: string | null;
    phone: string | null;
};

export type CalendarContactNote = {
    id?: string;
    body?: string;
    createdAt?: string;
    [key: string]: unknown;
};

export type CalendarItem = {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    selectedSlot: string | null;
    status: string;
    appointmentStatus: string;
    contact: CalendarContact;
    caller_summary: string | null;
    reason: string | null;
    group: string | null;
    contact_notes: CalendarContactNote[];
};

export type CalendarResponse = {
    total: number;
    page: number;
    page_size: number;
    calendar: CalendarItem[];
};

export type CalendarParams = {
    start_date?: string | null;
    end_date?: string | null;
    page?: number | null;
    page_size?: number | null;
};

const buildParams = ({ start_date, end_date, page, page_size }: CalendarParams) => {
    const params: Record<string, string> = {};
    if (start_date) {
        params.start_date = start_date;
    }
    if (end_date) {
        params.end_date = end_date;
    }
    if (page) {
        params.page = String(page);
    }
    if (page_size) {
        params.page_size = String(page_size);
    }
    return params;
};

export function useCalendarQuery(params: CalendarParams) {
    const safeParams = buildParams(params);
    return useQuery({
        queryKey: [
            "calendar",
            safeParams.start_date ?? "",
            safeParams.end_date ?? "",
            params.page ?? 1,
            params.page_size ?? "",
        ],
        queryFn: async () => {
            const response = await apiClient.get<CalendarResponse>(
                "/api/dashboard/calendar",
                {
                    params: safeParams,
                },
            );
            return response.data;
        },
        placeholderData: (previous) => previous,
    });
}
