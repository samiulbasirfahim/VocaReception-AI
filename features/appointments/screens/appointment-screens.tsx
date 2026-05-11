import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import AppointmentHeader from "../components/appointment-header";
import AppointmentList from "../components/appointment-list";
import { useCalendarStore } from "../store/params.store";

export default function AppointmentScreens() {
    const { startDate, endDate } = useCalendarStore();
    return (
        <SafeLayout includeTopInsets gap={24} fixedHeaderIndices={[0]}>
            <AppointmentHeader />
            <AppointmentList />
        </SafeLayout>
    );
}
