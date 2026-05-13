import { apiClient } from "@/features/common/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export type LeadsSummary = {
    all: number;
    high: number;
    mid: number;
    low: number;
    new: number;
    closed: number;
    booked: number;
    urgent: number;
    qualified: number;
    total: number;
};

export type LeadsSummaryResponse = {
    summary: LeadsSummary;
};

export function useLeadsSummaryQuery() {
    return useQuery({
        queryKey: ["leads", "summary"],
        queryFn: async () => {
            const response = await apiClient.get<LeadsSummaryResponse>(
                "/api/dashboard/leads",
            );
            return response.data;
        },
    });
}
