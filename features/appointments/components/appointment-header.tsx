import { AppColor } from "@/constant/color";
import AppText from "@/features/common/components/text";
import { router } from "expo-router";
import { Calendar } from "lucide-react-native";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function AppointmentHeader() {
    const handleCalendarPress = () => {
        router.push("/calendar");
    };
    return (
        <View style={sts.conatiner}>
            <View style={sts.titleSide}>
                <AppText variant="h1">Appointments</AppText>
                <AppText muted variant="label">
                    Synced with GoHighLevel(GHL)
                </AppText>
            </View>
            <TouchableOpacity
                activeOpacity={0.75}
                style={sts.iconWrapper}
                onPress={handleCalendarPress}
            >
                <Calendar color={AppColor.background} size={30} />
            </TouchableOpacity>
        </View>
    );
}

const sts = StyleSheet.create({
    conatiner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: AppColor.background,
        paddingTop: 20,
        paddingBottom: 12,
    },
    titleSide: {},
    iconWrapper: {
        backgroundColor: AppColor.foreground,
        padding: 10,
        borderRadius: 12,
    },
});
