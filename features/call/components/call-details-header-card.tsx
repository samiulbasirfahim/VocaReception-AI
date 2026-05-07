import { AppColor } from "@/constant/color";
import { AppShadow } from "@/constant/shadow";
import { StatusBadge } from "@/features/common/components/status-badge";
import AppText from "@/features/common/components/text";
import { TextBadge } from "@/features/common/components/text-badge";
import { mapCallStatus } from "@/features/common/utils/map-call-status";
import { Clock, Phone } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

export function CallDetailsHeaderCard() {
    const mappedCallStatus = mapCallStatus("booked");
    return (
        <View style={sts.container}>
            <View style={sts.row}>
                <View style={sts.rowT}>
                    <AppText variant="body" weight="bold">
                        John Abraham
                    </AppText>
                    <StatusBadge status="D" />
                </View>
                <TextBadge
                    text={mappedCallStatus.label}
                    backgroundColor={mappedCallStatus.backgroundColor}
                    textColor={mappedCallStatus.textColor}
                    borderColor={mappedCallStatus.textColor + "50"}
                />
            </View>
            <View style={sts.rowT}>
                <Phone size={16} color={AppColor.foreground_muted} />
                <AppText variant="body-sm" muted>
                    +1 234 567 890
                </AppText>
            </View>

            <View style={sts.rowT}>
                <Clock size={16} color={AppColor.foreground_muted} />
                <AppText variant="body-sm" muted>
                    Today, 10:00 AM
                </AppText>
                <View style={sts.divider} />
                <AppText variant="body-sm" muted>
                    4m 12s
                </AppText>
            </View>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: AppColor.background,
        padding: 10,
        paddingVertical: 14,
        gap: 10,
        borderWidth: 1,
        borderColor: AppColor.border,
        borderRadius: 12,
        ...AppShadow.sm,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        gap: 12,
    },

    rowT: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexShrink: 1,
        flexGrow: 0,
    },
    divider: {
        height: "100%",
        width: 1,
        backgroundColor: AppColor.border,
        marginHorizontal: 4,
    },
});
