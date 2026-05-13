import { apiClient } from "@/features/common/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export type DashboardRecentActivity = {
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

export type DashboardStatsResponse = {
    todays_call_count: number;
    todays_booking_count: number;
    calls_growth: string;
    booked_growth: string;
    ai_insight: string;
    recent_activity: DashboardRecentActivity[];
};

export function useDashboardStatsQuery() {
    return useQuery({
        queryKey: ["dashboard", "stats"],
        queryFn: async () => {
            const response = await apiClient.get<DashboardStatsResponse>(
                "/api/dashboard/stats",
            );
            return response.data;
        },
    });
}
