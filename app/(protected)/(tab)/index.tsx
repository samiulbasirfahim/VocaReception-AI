import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import HomeScren from "@/features/home/screens/home-screen";
import { TabIconRenderer } from "@/features/tabs/components/icon-renderer";
import { Tabs } from "@/lib/app-tab";
import { Home } from "lucide-react-native";

export default function Index() {
    return (
        <>
            <Tabs.Screen
                options={{
                    title: "Home",
                    tabBarIcon: (props) => (
                        <TabIconRenderer focused={props.focused} icon={Home} />
                    ),
                }}
            />
            <HomeScren />
        </>
    );
}
