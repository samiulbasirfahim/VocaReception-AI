import CallScreen from "@/features/call/screens/call-screen";
import { TabIconRenderer } from "@/features/tabs/components/icon-renderer";
import { Tabs } from "@/lib/app-tab";
import { Phone } from "lucide-react-native";

export default function Index() {
    return (
        <>
            <Tabs.Screen
                options={{
                    title: "Calls",
                    tabBarIcon: (props) => (
                        <TabIconRenderer focused={props.focused} icon={Phone} />
                    ),
                }}
            />
            <CallScreen />
        </>
    );
}
