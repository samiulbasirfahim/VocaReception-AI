import HomeHeader from "../components/home-header";
import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import { HomeStatCards } from "../components/home-stat-card";
import { AiSection } from "@/features/common/components/ai-section";
import HomeQuickAction from "../components/home-quick-actions";
import { HomeRecentActivityFilter } from "../components/home-recent-activity-filter";
import { useState } from "react";
import { formatFilters } from "@/features/common/utils/format-filters";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const FILTERS_COUNT = {
    all: 4,
    high: 5,
    leads: 22,
    vip: 11,
    meets: 84,
};

export default function HomeScren() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const filters = formatFilters(FILTERS_COUNT);

    const tabHeight = useBottomTabBarHeight();

    return (
        <SafeLayout includeTopInsets gap={24} bottomExtraPadding={tabHeight}>
            <HomeHeader />

            <HomeStatCards />
            <AiSection
                title="AI INSIGHT"
                description="Tax season is peaking — 67% of today's calls are tax-related. Consider promoting your express filing package."
                footer="Booking rate up 18% vs. last week"
            />
            <HomeQuickAction />

            <HomeRecentActivityFilter
                filters={filters}
                setSelectedIdx={setSelectedIndex}
                selectedIdx={selectedIndex}
            />
        </SafeLayout>
    );
}
