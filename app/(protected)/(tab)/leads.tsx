import LeadsScreen from "@/features/leads/screens/leads-screen";
import { TabIconRenderer } from "@/features/tabs/components/icon-renderer";
import { Tabs } from "@/lib/app-tab";
import { Users } from "lucide-react-native";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <>
            <Tabs.Screen
                options={{
                    title: "Leads",
                    tabBarIcon: (props) => (
                        <TabIconRenderer focused={props.focused} icon={Users} />
                    ),
                }}
            />
            <LeadsScreen />
        </>
    );
}
