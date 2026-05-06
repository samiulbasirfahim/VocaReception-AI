import { AppColor } from "@/constant/color";
import { LucideIcon } from "lucide-react-native";

type Props = {
    icon: LucideIcon;
    focused: boolean;
};
export function TabIconRenderer({ focused, ...prop }: Props) {
    return (
        <prop.icon
            strokeWidth={1.5}
            color={focused ? AppColor.primary : AppColor.foreground_muted}
        />
    );
}
