import { apiClient } from "@/features/common/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export type LeadsFilter =
    | "all"
    | "high"
    | "low"
    | "mid"
    | "new"
    | "closed"
    | "booked";

export type LeadsListItem = {
    id: string;
    name: string;
    email: string;
    phone: string;
    priority: string;
    intent: string;
    status: string;
    reason: string;
    last_contact: string;
    tags: string[];
};

export type LeadsListResponse = {
    total: number;
    page: number;
    page_size: number;
    leads: LeadsListItem[];
    counts: Record<string, number>;
};

export type LeadsListParams = {
    query?: string | null;
    filter?: LeadsFilter | string | null;
    page?: number | null;
    page_size?: number | null;
};

const buildParams = ({ query, filter, page, page_size }: LeadsListParams) => {
    const params: Record<string, string> = {};
    if (query && query.trim().length > 0) {
        params.query = query.trim();
    }
    if (filter) {
        params.filter = filter;
    }
    if (page) {
        params.page = String(page);
    }
    if (page_size) {
        params.page_size = String(page_size);
    }
    return params;
};

export const normalizeLeadsFilterLabel = (label: string) =>
    label.replace(/\s*\(\d+\)\s*$/, "").trim().toLowerCase();

export function useLeadsListQuery(params: LeadsListParams) {
    const safeParams = buildParams(params);
    return useQuery({
        queryKey: [
            "leads",
            "list",
            params.query ?? "",
            params.filter ?? "all",
            params.page ?? 1,
            params.page_size ?? "",
        ],
        queryFn: async () => {
            const response = await apiClient.get<LeadsListResponse>(
                "/api/dashboard/leads/list",
                {
                    params: safeParams,
                },
            );
            return response.data;
        },
        placeholderData: (previous) => previous,
    });
}
