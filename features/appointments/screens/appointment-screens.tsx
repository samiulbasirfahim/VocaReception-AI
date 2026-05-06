import AppointmentHeader from "../components/appointment-header";
import AppointmentList from "../components/appointment-list";
import SafeViewLayout from "@/features/common/layout/safe-view";

export default function AppointmentScreens() {
    return (
        <SafeViewLayout includeTopInsets gap={24}>
            <AppointmentHeader />
            <AppointmentList />
        </SafeViewLayout>
    );
}
