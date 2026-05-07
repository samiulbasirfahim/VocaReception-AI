import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import AppointmentHeader from "../components/appointment-header";
import AppointmentList from "../components/appointment-list";

export default function AppointmentScreens() {
    return (
        <SafeLayout includeTopInsets gap={24} fixedHeaderIndices={[0]}>
            <AppointmentHeader />
            <AppointmentList />
        </SafeLayout>
    );
}
