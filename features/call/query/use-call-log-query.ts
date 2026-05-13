import { apiClient } from "@/features/common/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export type CallLogItem = {
    id: number;
    name: string;
    call_sid: string;
    caller_number: string;
    start_time: string;
    duration: number;
    summary: string;
    reason: string;
    status: string;
    outcome: string;
    lead_status: string;
    group: string;
    tags: string;
};

export type CallLogResponse = {
    total: number;
    page: number;
    page_size: number;
    calls: CallLogItem[];
};

export type CallLogParams = {
    page?: number | null;
    page_size?: number | null;
    query?: string | null;
    filter?: string | null;
};

const buildParams = ({ page, page_size, query, filter }: CallLogParams) => {
    const params: Record<string, string> = {};
    if (page) {
        params.page = String(page);
    }
    if (page_size) {
        params.page_size = String(page_size);
    }
    if (query && query.trim().length > 0) {
        params.query = query.trim();
    }
    if (filter) {
        params.filter = filter;
    }
    return params;
};

export function useCallLogQuery(params: CallLogParams) {
    const safeParams = buildParams(params);
    return useQuery({
        queryKey: [
            "call-log",
            "list",
            params.page ?? 1,
            params.page_size ?? 10,
            params.query ?? "",
            params.filter ?? "",
        ],
        queryFn: async () => {
            const response = await apiClient.get<CallLogResponse>(
                "/api/dashboard/call-log",
                {
                    params: safeParams,
                },
            );
            return response.data;
        },
        placeholderData: (previous) => previous,
    });
}
