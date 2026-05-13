import { AiSection } from "@/features/common/components/ai-section";
import Loader from "@/features/common/components/loader";
import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import { Call } from "@/features/common/type/call";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useMemo } from "react";
import HomeCallList from "../components/home-call-list";
import HomeHeader from "../components/home-header";
import HomeQuickAction from "../components/home-quick-actions";
import { HomeStatCards } from "../components/home-stat-card";
import {
    DashboardRecentActivity,
    useDashboardStatsQuery,
} from "../query/use-dashboard-stats-query";

const DEFAULT_STATS = {
    todays_call_count: 0,
    todays_booking_count: 0,
    calls_growth: "0 today",
    booked_growth: "0 today",
    ai_insight: "No insights available yet.",
    recent_activity: [],
};

const normalizeReason = (reason?: string): Call["reason"] => {
    switch (reason) {
        case "tex-preparation":
            return "tex-preparation";
        case "business-consulting":
            return "business-consulting";
        case "payrol-service":
            return "payrol-service";
        default:
            return "other";
    }
};

const normalizeStatus = (status?: string): Call["status"] => {
    switch (status) {
        case "booked":
            return "booked";
        case "completed":
            return "completed";
        default:
            return "follow-up";
    }
};

const normalizeClientStatus = (status?: string): Call["client_status"] => {
    if (status === "A" || status === "B" || status === "C" || status === "D") {
        return status;
    }
    return "D";
};

const mapRecentActivityToCalls = (items: DashboardRecentActivity[]): Call[] =>
    items.map((item, index) => ({
        id: String(item.call_sid || item.id || index),
        name: item.name || "Unknown",
        client_status: normalizeClientStatus(item.lead_status),
        phone: item.caller_number || "Unknown",
        time: new Date(item.start_time),
        status: normalizeStatus(item.status),
        reason: normalizeReason(item.reason),
    }));

export default function HomeScren() {
    const { data, refetch, isLoading } = useDashboardStatsQuery();
    const stats = data ?? DEFAULT_STATS;
    const recentCalls = useMemo(
        () => mapRecentActivityToCalls(stats.recent_activity ?? []),
        [stats.recent_activity],
    );

    const tabHeight = useBottomTabBarHeight();

    if (isLoading && !data) {
        return (
            <SafeLayout includeTopInsets gap={24} bottomExtraPadding={tabHeight}>
                <HomeHeader />
                <Loader label="Loading dashboard..." />
            </SafeLayout>
        );
    }

    return (
        <SafeLayout
            includeTopInsets
            gap={24}
            bottomExtraPadding={tabHeight}
            onRefresh={async () => {
                await refetch();
            }}
        >
            <HomeHeader />

            <HomeStatCards
                callsCount={stats.todays_call_count}
                bookingsCount={stats.todays_booking_count}
                callsGrowthLabel={stats.calls_growth}
                bookedGrowthLabel={stats.booked_growth}
            />
            <AiSection title="AI INSIGHT" description={stats.ai_insight} />
            {/* footer="Booking rate up 18% vs. last week" */}
            <HomeQuickAction />

            <HomeCallList calls={recentCalls} />
        </SafeLayout>
    );
}
