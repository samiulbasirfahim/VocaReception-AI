import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import LeadsHeadder from "../components/leads-header";
import LeadsIcons from "../components/leads-icons";
import LeadsSearch from "../components/leads-search";
import { useState } from "react";
import useDebounce from "@/features/common/hooks/useDebounce";
import { formatFilters } from "@/features/common/utils/format-filters";
import LeadsListItem from "../components/leads-list-item";
import LeadsList from "../components/leads-list";

const FILTERS_COUNT = {
    all: 4,
    high: 5,
    leads: 22,
    vip: 11,
    meets: 84,
};

export default function LeadsScreen() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const debouncedSearchQuery = useDebounce(searchQuery, 1000);

    const filters = formatFilters(FILTERS_COUNT);

    return (
        <SafeLayout includeTopInsets gap={24} fixedHeaderIndices={[2]}>
            <LeadsHeadder />
            <LeadsIcons />
            <LeadsSearch
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                filters={filters}
                setSelectedIdx={setSelectedIndex}
                selectedIdx={selectedIndex}
            />
            <LeadsList />
        </SafeLayout>
    );
}
