import { AppColor } from "@/constant/color";
import { AppShadow } from "@/constant/shadow";
import { StatusBadge } from "@/features/common/components/status-badge";
import AppText from "@/features/common/components/text";
import { TextBadge } from "@/features/common/components/text-badge";
import { Calendar, Clock } from "lucide-react-native";
import { View, StyleSheet } from "react-native";
import { Appointment } from "../type/appointment";

type AppointmentListItemProps = {
    appointment: Appointment;
};

export function AppointmentListItem({ appointment }: AppointmentListItemProps) {
    return (
        <View style={sts.container}>
            <View style={sts.iconWrapper}>
                <Calendar color={AppColor.background} />
            </View>
            <View style={sts.rightContainer}>
                <View style={sts.row}>
                    <AppText variant="body" weight="bold">
                        {appointment.title}
                    </AppText>

                    <StatusBadge status={appointment.status} />
                </View>

                <View style={sts.row}>
                    <View style={sts.textBottomContainer}>
                        <Clock color={AppColor.foreground_muted} size={14} />
                        <AppText variant="caption">12th Aug, 3:00 PM</AppText>
                    </View>

                    <TextBadge
                        text={appointment.description}
                        backgroundColor={AppColor.primary + "20"}
                        borderColor={AppColor.border}
                        textColor={AppColor.primary}
                    />
                </View>
            </View>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        gap: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: AppColor.border,
        backgroundColor: AppColor.background,
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        ...AppShadow.xs,
        width: "100%",
    },

    iconWrapper: {
        backgroundColor: AppColor.foreground,
        padding: 12,
        borderRadius: 10,
        alignSelf: "center",
    },
    rightContainer: {
        gap: 4,
        flex: 1,
    },
    textBottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },
});
