import { Call } from "@/features/common/type/call";
import useDebounce from "@/features/common/hooks/useDebounce";
import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import EmptyState from "@/features/common/components/empty-state";
import Loader from "@/features/common/components/loader";
import { formatFilters } from "@/features/common/utils/format-filters";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect, useMemo, useState } from "react";
import CallHeader from "../components/call-header";
import CallList from "../components/call-list";
import CallSearch from "../components/call-search";
import {
    CallLogItem,
    useCallLogQuery,
} from "../query/use-call-log-query";
import { useCallLogSummaryQuery } from "../query/use-call-log-summary-query";

const DEFAULT_SUMMARY = {
    all: 0,
    completed: 0,
    missed: 0,
    inquiry: 0,
    booked: 0,
};

const FILTER_ORDER: Array<keyof typeof DEFAULT_SUMMARY> = [
    "all",
    "completed",
    "missed",
    "inquiry",
    "booked",
];

const DEFAULT_LIST = {
    total: 0,
    page: 1,
    page_size: 10,
    calls: [],
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

const mapCalls = (items: CallLogItem[]): Call[] =>
    items.map((item, index) => ({
        id: String(item.call_sid || item.id || index),
        name: item.name || "Unknown",
        client_status: normalizeClientStatus(item.group || item.lead_status),
        phone: item.caller_number || "Unknown",
        time: new Date(item.start_time),
        status: normalizeStatus(item.status),
        reason: normalizeReason(item.reason),
    }));

export default function CallScreen() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const debouncedSearchQuery = useDebounce(searchQuery, 1000);
    const [page, setPage] = useState<number>(1);
    const bottomTabHeight = useBottomTabBarHeight();
    const { data: summaryData, isLoading: isSummaryLoading } =
        useCallLogSummaryQuery();
    const summary = summaryData?.summary ?? DEFAULT_SUMMARY;
    const filterKeys = useMemo(() => FILTER_ORDER, []);
    const selectedFilter = filterKeys[selectedIndex] ?? "all";
    const filters = useMemo(
        () => formatFilters(summary as Record<string, number>),
        [summary],
    );
    const { data: callLogData, isLoading: isCallLogLoading } = useCallLogQuery({
        page,
        page_size: 10,
        query: debouncedSearchQuery,
        filter: selectedFilter,
    });
    const callLog = callLogData ?? DEFAULT_LIST;
    const calls = useMemo(() => mapCalls(callLog.calls), [callLog.calls]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearchQuery, selectedIndex]);

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
            {isCallLogLoading || isSummaryLoading ? (
                <Loader label="Loading calls..." />
            ) : calls.length === 0 ? (
                <EmptyState
                    title="No calls yet"
                    description="Calls will show up here once they are available."
                />
            ) : (
                <CallList calls={calls} />
            )}
        </SafeLayout>
    );
}
