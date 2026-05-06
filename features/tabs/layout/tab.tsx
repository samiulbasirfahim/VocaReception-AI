import { AppColor } from "@/constant/color";
import { Tabs } from "@/lib/app-tab";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabLabelRender from "../components/label-renderer";

export default function TabLayout() {
    const { bottom } = useSafeAreaInsets();
    return (
        <Tabs
            screenOptions={{
                lazy: false,
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
            <Tabs.Screen name="index" />
            <Tabs.Screen name="calls" />
            <Tabs.Screen name="leads" />
            <Tabs.Screen name="appointments" />
        </Tabs>
    );
}
