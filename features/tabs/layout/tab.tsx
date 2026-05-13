import { AppColor } from "@/constant/color";
import { Tabs } from "@/lib/app-tab";
import { CalendarClock, Home, Phone, Users } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabIconRenderer } from "../components/icon-renderer";
import TabLabelRender from "../components/label-renderer";

export default function TabLayout() {
    const { bottom } = useSafeAreaInsets();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    height: bottom + 80,
                    backgroundColor: AppColor.background,
                    position: "absolute",
                },
                tabBarInactiveBackgroundColor: AppColor.background,
                tabBarAllowFontScaling: true,
                tabBarIconStyle: {
                    height: 30,
                    width: 30,
                },
                tabBarItemStyle: {
                    margin: 10,
                    borderRadius: 20,
                    backgroundColor: AppColor.primary_tab_bg,
                },
                tabBarLabel: TabLabelRender,
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: (props) => (
                        <TabIconRenderer focused={props.focused} icon={Home} />
                    ),
                }}
            />
            <Tabs.Screen
                name="calls"
                options={{
                    title: "Calls",
                    tabBarIcon: (props) => (
                        <TabIconRenderer focused={props.focused} icon={Phone} />
                    ),
                }}
            />
            <Tabs.Screen
                name="leads"
                options={{
                    title: "Leads",
                    tabBarIcon: (props) => (
                        <TabIconRenderer focused={props.focused} icon={Users} />
                    ),
                }}
            />
            <Tabs.Screen
                name="appointments"
                options={{
                    title: "Meets",
                    tabBarIcon: (props) => (
                        <TabIconRenderer focused={props.focused} icon={CalendarClock} />
                    ),
                }}
            />
        </Tabs>
    );
}
