import { AppColor } from "@/constant/color";
import { AppShadow } from "@/constant/shadow";
import { StatusBadge } from "@/features/common/components/status-badge";
import AppText from "@/features/common/components/text";
import { TextBadge } from "@/features/common/components/text-badge";
import { Call } from "@/features/common/type/call";
import { Status } from "@/features/common/type/status";
import { mapCallStatus } from "@/features/common/utils/map-call-status";
import { Clock, Phone } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

type Props = {
    name: string;
    status: Call["status"];
    group: Status;
    phone: string;
    startTime: Date;
    durationSeconds: number;
};

const formatDuration = (durationSeconds: number) => {
    const totalSeconds = Math.max(0, Math.floor(durationSeconds));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts: string[] = [];
    if (hours > 0) {
        parts.push(`${hours}h`);
    }
    if (minutes > 0 || hours > 0) {
        parts.push(`${minutes}m`);
    }
    parts.push(`${seconds}s`);
    return parts.join(" ");
};

export function CallDetailsHeaderCard({
    name,
    status,
    group,
    phone,
    startTime,
    durationSeconds,
}: Props) {
    const mappedCallStatus = mapCallStatus(status);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(startTime);
    return (
        <View style={sts.container}>
            <View style={sts.row}>
                <View style={sts.rowT}>
                    <AppText variant="body" weight="bold">
                        {name}
                    </AppText>
                    <StatusBadge status={group} />
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
                    {phone}
                </AppText>
            </View>

            <View style={sts.rowT}>
                <Clock size={16} color={AppColor.foreground_muted} />
                <AppText variant="body-sm" muted>
                    {formattedTime}
                </AppText>
                <View style={sts.divider} />
                <AppText variant="body-sm" muted>
                    {formatDuration(durationSeconds)}
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
