import { AppColor } from "@/constant/color";
import AppText from "@/features/common/components/text";
import { CalendarCheck2, LucideIcon, UserSearch } from "lucide-react-native";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

type Button = {
    icon: LucideIcon;
    iconBg: string;
    onPress: () => void;
    label: string;
};

export default function HomeQuickAction() {
    const buttons: Button[] = [
        {
            label: "View Leads",
            iconBg: "#4F46E5",
            icon: UserSearch,
            onPress: () => {
                console.log("View Leads press");
            },
        },
        {
            label: "Calendar",
            iconBg: "#191B24",
            icon: CalendarCheck2,
            onPress: () => {
                console.log("View Calendar");
            },
        },
    ];
    return (
        <View style={sts.container}>
            <AppText variant="h4">Quick Actions</AppText>
            <View style={sts.actionContainer}>
                {buttons.map((itm, idx) => (
                    <TouchableOpacity
                        activeOpacity={0.65}
                        style={sts.actionButtonContainer}
                        onPress={itm.onPress}
                        key={idx}
                    >
                        <View
                            style={[
                                sts.iconWrapper,
                                {
                                    backgroundColor: itm.iconBg,
                                },
                            ]}
                        >
                            <itm.icon color={"white"} />
                        </View>
                        <AppText>{itm.label}</AppText>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const sts = StyleSheet.create({
    actionContainer: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    container: {
        gap: 6,
    },
    actionButtonContainer: {
        flex: 1,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: AppColor.border,
        borderRadius: 8,
        gap: 6,
        padding: 8,
        paddingVertical: 16,
        alignItems: "center",
    },

    iconWrapper: {
        padding: 12,
        borderRadius: 8,
    },
});
