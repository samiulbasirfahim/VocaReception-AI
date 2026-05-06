import AppointmentScreens from "@/features/appointments/screens/appointment-screens";
import { TabIconRenderer } from "@/features/tabs/components/icon-renderer";
import { Tabs } from "@/lib/app-tab";
import { CalendarClock } from "lucide-react-native";

export default function Index() {
    return (
        <>
            <Tabs.Screen
                options={{
                    title: "Meets",
                    tabBarIcon: (props) => (
                        <TabIconRenderer focused={props.focused} icon={CalendarClock} />
                    ),
                }}
            />
            <AppointmentScreens />
        </>
    );
}
