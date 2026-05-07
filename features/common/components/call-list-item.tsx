import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "./text";
import { StatusBadge } from "./status-badge";
import { AppColor } from "@/constant/color";
import { Call } from "../type/call";
import { mapCallReason } from "../utils/map-call-reason";
import { mapCallStatus } from "../utils/map-call-status";
import { TextBadge } from "./text-badge";
import { ChevronRight, MoveRight } from "lucide-react-native";
import { router } from "expo-router";

type Props = {
    call: Call;
};

export default function CallListItem({ call }: Props) {
    const mappedReason = mapCallReason(call.reason);
    const mappedStatus = mapCallStatus(call.status);

    const onPress = () => {
        router.push({
            pathname: "/call-details/[call_id]",
            params: {
                call_id: call.id,
            },
        });
    };

    return (
        <TouchableOpacity
            activeOpacity={0.75}
            onPress={onPress}
            style={sts.container}
        >
            <View style={sts.row}>
                <View style={sts.rowT}>
                    <AppText>John Davidson</AppText>
                    <StatusBadge status={call.client_status ?? "D"} />
                </View>
                <AppText variant="body-sm" muted>
                    {new Date(call.time).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                    })}
                </AppText>
            </View>
            <View style={sts.row}>
                <View style={sts.rowT}>
                    <AppText variant="label" muted>
                        {call.phone}
                    </AppText>
                    <TextBadge
                        text={mappedReason.label}
                        backgroundColor={mappedReason.backgroundColor}
                        textColor={mappedReason.textColor}
                        borderColor={mappedReason.textColor + "50"}
                    />

                    {call.status && (
                        <>
                            <MoveRight color={AppColor.foreground_muted} size={16} />
                            <TextBadge
                                text={mappedStatus.label}
                                backgroundColor={mappedStatus.backgroundColor}
                                textColor={mappedStatus.textColor}
                                borderColor={mappedStatus.textColor + "50"}
                            />
                        </>
                    )}
                </View>
                <ChevronRight color={AppColor.foreground_muted} size={20} />
            </View>
        </TouchableOpacity>
    );
}

const sts = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: AppColor.background,
        paddingVertical: 12,
        paddingHorizontal: 8,
        gap: 6,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        gap: 8,
    },

    rowT: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexShrink: 1,
        flexGrow: 0,
    },
});
