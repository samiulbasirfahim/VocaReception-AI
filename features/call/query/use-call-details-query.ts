import { apiClient } from "@/features/common/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export type CallDetailsResponse = {
    id: number;
    name: string;
    group: string;
    call_sid: string;
    caller_number: string;
    start_time: string;
    duration: number;
    transcript: string;
    summary: string;
    reason: string;
    status: string;
    outcome: string;
    lead_status: string;
    tags: string;
};

export function useCallDetailsQuery(callId?: string | number | null) {
    return useQuery({
        queryKey: ["call-details", String(callId ?? "")],
        enabled: Boolean(callId),
        queryFn: async () => {
            const response = await apiClient.get<CallDetailsResponse>(
                `/api/dashboard/call-details/${callId}`,
            );
            return response.data;
        },
    });
}
