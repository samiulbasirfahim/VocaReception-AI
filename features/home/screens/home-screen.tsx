import HomeHeader from "../components/home-header";
import SafeKeyboardScrollView from "@/features/common/layout/safe-keyboard-scroll-view";
import { HomeStatCards } from "../components/home-stat-card";
import { AiSection } from "@/features/common/components/ai-section";
import HomeQuickAction from "../components/home-quick-actions";
import { HomeRecentActivityFilter } from "../components/home-recent-activity-filter";
import { useState } from "react";

const FILTERS = ["All", "High", "Leads", "VIP", "Meets"];
const FILTERS_COUNT = [4, 5, 22, 11, 84];

export default function HomeScren() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const filters = FILTERS.map((x, i) => {
        return `${x}(${FILTERS_COUNT[i]})`;
    });

    return (
        <SafeKeyboardScrollView includeTopInsets gap={24}>
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
        </SafeKeyboardScrollView>
    );
}
