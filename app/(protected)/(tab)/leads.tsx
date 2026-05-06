import { TabIconRenderer } from "@/features/tabs/components/icon-renderer";
import { Tabs } from "@/lib/app-tab";
import { Users } from "lucide-react-native";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <View>
            <Tabs.Screen
                options={{
                    title: "Home",
                    tabBarIcon: (props) => (
                        <TabIconRenderer focused={props.focused} icon={Users} />
                    ),
                }}
            />
        </View>
    );
}
