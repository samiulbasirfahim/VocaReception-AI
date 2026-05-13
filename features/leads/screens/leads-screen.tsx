import EmptyState from "@/features/common/components/empty-state";
import Loader from "@/features/common/components/loader";
import PaginationController from "@/features/common/components/pagination-controller";
import useDebounce from "@/features/common/hooks/useDebounce";
import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import { formatFilters } from "@/features/common/utils/format-filters";
import { queryClient } from "@/features/common/utils/queryClient";
import { useEffect, useState } from "react";
import LeadsHeadder from "../components/leads-header";
import LeadsIcons from "../components/leads-icons";
import LeadsList from "../components/leads-list";
import LeadsSearch from "../components/leads-search";
import {
    normalizeLeadsFilterLabel,
    useLeadsListQuery,
    type LeadsListItem as ApiLead,
} from "../query/use-leads-list-query";
import { useLeadsSummaryQuery } from "../query/use-leads-summary-query";
import { Lead } from "../type/lead";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const EMPTY_SUMMARY = {
    all: 0,
    high: 0,
    mid: 0,
    low: 0,
    new: 0,
    closed: 0,
    booked: 0,
    urgent: 0,
    qualified: 0,
    total: 0,
};

const mapPriority = (priority: string): Lead["priority"] => {
    const normalized = priority.trim().toLowerCase();
    if (normalized === "high") {
        return "high";
    }
    if (normalized === "mid" || normalized === "medium") {
        return "medium";
    }
    if (normalized === "low") {
        return "low";
    }
    return "low";
};

const mapStatus = (status: string): Lead["status"] => {
    const normalized = status.trim().toLowerCase();
    if (normalized === "connected") {
        return "connected";
    }
    if (normalized === "booked") {
        return "booked";
    }
    if (normalized === "closed") {
        return "closed";
    }
    return "new";
};

const mapIntent = (intent: string): Lead["type"] => {
    const normalized = intent.trim().toLowerCase().replace(/\s+/g, "_");
    if (normalized === "pricing") {
        return "pricing";
    }
    if (normalized === "sales") {
        return "sales";
    }
    if (normalized === "consultation") {
        return "consultation";
    }
    if (normalized === "tex_prepration" || normalized === "tax_preparation") {
        return "tex_prepration";
    }
    return "other";
};

const mapApiLeadToLead = (lead: ApiLead): Lead => ({
    id: lead.id,
    title: lead.name,
    type: mapIntent(lead.intent),
    last_contacted_at: lead.last_contact,
    priority: mapPriority(lead.priority),
    status: mapStatus(lead.status),
});

export default function LeadsScreen() {
    const tabHeight = useBottomTabBarHeight();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const debouncedSearchQuery = useDebounce(searchQuery, 1000);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const { data: summaryData } = useLeadsSummaryQuery();
    const summary = summaryData?.summary ?? EMPTY_SUMMARY;
    const filters = formatFilters({
        all: summary.all,
        high: summary.high,
        mid: summary.mid,
        low: summary.low,
        new: summary.new,
        closed: summary.closed,
        booked: summary.booked,
    });
    const selectedFilterLabel = filters[selectedIndex] ?? "All";
    const selectedFilter = normalizeLeadsFilterLabel(selectedFilterLabel);
    const { data, isFetching, isLoading } = useLeadsListQuery({
        query: debouncedSearchQuery,
        filter: selectedFilter,
        page,
        page_size: pageSize,
    });
    const leads = data?.leads.map(mapApiLeadToLead);
    const resolvedPageSize =
        data?.page_size && data.page_size > 0 ? data.page_size : pageSize;
    const totalPages = data?.total
        ? Math.max(1, Math.ceil(data.total / resolvedPageSize))
        : 1;
    const hasLeads = (leads?.length ?? 0) > 0;
    const isInitialLoading = (isLoading || isFetching) && !hasLeads;
    const isEmpty = !isInitialLoading && !hasLeads;
    const showPagination = totalPages > 1 && !isEmpty;
    const isPaginating = isFetching && hasLeads;

    useEffect(() => {
        setPage(1);
    }, [selectedFilter, debouncedSearchQuery]);

    const onRefresh = async () => {
        setPage(1);
        await queryClient.invalidateQueries({
            queryKey: ["leads"],
        });
    };

    return (
        <SafeLayout
            includeTopInsets
            gap={24}
            fixedHeaderIndices={[2]}
            onRefresh={onRefresh}
            bottomExtraPadding={tabHeight + 16}
        >
            <LeadsHeadder total={summary.total} />
            <LeadsIcons
                urgent={summary.urgent}
                newCount={summary.new}
                qualified={summary.qualified}
            />
            <LeadsSearch
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                filters={filters}
                setSelectedIdx={setSelectedIndex}
                selectedIdx={selectedIndex}
            />
            {isInitialLoading ? <Loader label="Loading leads..." /> : null}
            {isEmpty ? (
                <EmptyState
                    title="No leads yet"
                    description="Try adjusting your search or filters."
                />
            ) : (
                <LeadsList leads={leads} />
            )}
            {isPaginating ? <Loader label="Loading page..." size="small" /> : null}
            {showPagination ? (
                <PaginationController
                    page={page}
                    onPageChange={setPage}
                    totalPages={totalPages}
                />
            ) : null}
        </SafeLayout>
    );
}
