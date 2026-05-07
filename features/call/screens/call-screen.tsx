import useDebounce from "@/features/common/hooks/useDebounce";
import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import { useState } from "react";
import CallHeader from "../components/call-header";
import { formatFilters } from "@/features/common/utils/format-filters";
import CallList from "../components/call-list";
import CallSearch from "../components/call-search";
import PaginationController from "@/features/common/components/pagination-controller";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const FILTERS_COUNT = {
    all: 4,
    high: 5,
    leads: 22,
    vip: 11,
    meets: 84,
};

export default function CallScreen() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const debouncedSearchQuery = useDebounce(searchQuery, 1000);
    const [page, setPage] = useState<number>(0);
    const bottomTabHeight = useBottomTabBarHeight();

    const filters = formatFilters(FILTERS_COUNT);

    return (
        <SafeLayout
            includeTopInsets
            fixedHeaderIndices={[1]}
            bottomExtraPadding={bottomTabHeight}
        >
            <CallHeader />
            <CallSearch
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                filters={filters}
                setSelectedIdx={setSelectedIndex}
                selectedIdx={selectedIndex}
            />
            <CallList />
            <PaginationController
                page={page}
                onPageChange={setPage}
                totalPages={10}
            />
        </SafeLayout>
    );
}
