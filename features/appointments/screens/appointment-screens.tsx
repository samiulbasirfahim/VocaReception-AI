import EmptyState from "@/features/common/components/empty-state";
import Loader from "@/features/common/components/loader";
import PaginationController from "@/features/common/components/pagination-controller";
import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import { queryClient } from "@/features/common/utils/queryClient";
import { useEffect, useState } from "react";
import AppointmentHeader from "../components/appointment-header";
import AppointmentList from "../components/appointment-list";
import {
    useCalendarQuery,
    type CalendarItem,
} from "../query/use-calendar-query";
import { useCalendarStore } from "../store/params.store";
import { Appointment } from "../type/appointment";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function AppointmentScreens() {
    const { startDate, endDate } = useCalendarStore();
    const tabHeight = useBottomTabBarHeight();
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const { data, isFetching, isLoading } = useCalendarQuery({
        start_date: startDate,
        end_date: endDate,
        page,
        page_size: pageSize,
    });

    const mapCalendarItemToAppointment = (item: CalendarItem): Appointment => ({
        id: item.id,
        title: item.title,
        date: new Date(item.startTime),
        description: item.appointmentStatus || item.status || "Appointment",
        startTime: item.startTime,
        endTime: item.endTime,
        appointmentStatus: item.appointmentStatus,
        bookingStatus: item.status,
        contact: item.contact,
        callerSummary: item.caller_summary,
        reason: item.reason,
        group: item.group,
        contactNotes: item.contact_notes,
    });

    const appointments = data?.calendar.map(mapCalendarItemToAppointment);
    const resolvedPageSize =
        data?.page_size && data.page_size > 0 ? data.page_size : pageSize;
    const totalCount = data?.total ?? data?.calendar.length ?? 0;
    const totalPages = totalCount
        ? Math.max(1, Math.ceil(totalCount / resolvedPageSize))
        : 1;
    const hasAppointments = (appointments?.length ?? 0) > 0;
    const isInitialLoading = (isLoading || isFetching) && !hasAppointments;
    const isEmpty = !isInitialLoading && !hasAppointments;
    const showPagination = totalPages > 1 && !isEmpty;
    const isPaginating = isFetching && hasAppointments;

    const onRefresh = async () => {
        setPage(1);
        await queryClient.invalidateQueries({
            queryKey: ["calendar"],
        });
    };

    useEffect(() => {
        setPage(1);
    }, [startDate, endDate]);
    return (
        <SafeLayout
            includeTopInsets
            gap={24}
            fixedHeaderIndices={[0]}
            bottomExtraPadding={tabHeight + 16}
            onRefresh={onRefresh}
        >
            <AppointmentHeader />
            {isInitialLoading ? <Loader label="Loading appointments..." /> : null}
            {isEmpty ? (
                <EmptyState
                    title="No appointments yet"
                    description="Try adjusting your date range."
                />
            ) : (
                <AppointmentList appointments={appointments} />
            )}
            {isPaginating ? (
                <Loader label="Loading page..." size="small" />
            ) : null}
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
