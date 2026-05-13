import { apiClient } from "@/features/common/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export type CallLogSummary = {
    all: number;
    completed: number;
    missed: number;
    inquiry: number;
    booked: number;
};

export type CallLogSummaryResponse = {
    summary: CallLogSummary;
};

export function useCallLogSummaryQuery() {
    return useQuery({
        queryKey: ["call-log", "summary"],
        queryFn: async () => {
            const response = await apiClient.get<CallLogSummaryResponse>(
                "/api/dashboard/call-log/summary",
            );
            return response.data;
        },
    });
}
