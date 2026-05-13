import { AppColor } from "@/constant/color";
import { TextBadge } from "@/features/common/components/text-badge";
import AppText from "@/features/common/components/text";
import { Call } from "@/features/common/type/call";
import { mapCallReason } from "@/features/common/utils/map-call-reason";
import {
    Calendar,
    CheckCircle,
    Mail,
    Tags,
    Verified,
} from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CallDetailsCard from "./call-details-card";

const GAP = 12;
const COLUMNS = 2;

type Props = {
    reason: Call["reason"];
    outcome?: string | null;
    scheduleStatus?: string | null;
    leadStatus?: string | null;
    tags?: string[] | null;
};

export default function CallDetailsCards({
    reason,
    outcome,
    scheduleStatus,
    leadStatus,
    tags,
}: Props) {
    const [blockWidth, setBlockWidth] = useState(0);
    const mappedReason = mapCallReason(reason);
    const outcomeLabel = outcome?.trim() || "Unknown";
    const scheduleStatusLabel = scheduleStatus?.trim() || "Unknown";
    const leadStatusLabel = leadStatus?.trim() || "Unknown";
    const tagList = (tags ?? [])
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

    return (
        <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: GAP }}
            onLayout={(e) => {
                const totalWidth = e.nativeEvent.layout.width;
                setBlockWidth((totalWidth - GAP * (COLUMNS - 1)) / COLUMNS);
            }}
        >
            <View style={{ width: blockWidth }}>
                <CallDetailsCard
                    header={{
                        title: "INTENT",
                        icon: Mail,
                    }}
                    content=<TextBadge
                        text={mappedReason.label}
                        lg
                        backgroundColor={mappedReason.backgroundColor}
                        textColor={mappedReason.textColor}
                        borderColor={mappedReason.textColor + "50"}
                    />
                />
            </View>

            <View style={{ width: blockWidth }}>
                <CallDetailsCard
                    header={{
                        title: "Outcome",
                        icon: CheckCircle,
                    }}
                    content=<View style={sts.rowT}>
                        <Calendar size={16} color={AppColor.secondary} strokeWidth={2} />
                        <AppText>{outcomeLabel}</AppText>
                    </View>
                />
            </View>
            <View style={{ width: blockWidth }}>
                <CallDetailsCard
                    header={{
                        title: "Schedule Status",
                    }}
                    content=<View style={sts.rowT}>
                        <Verified size={16} color={AppColor.secondary} strokeWidth={2} />
                        <AppText>{scheduleStatusLabel}</AppText>
                    </View>
                />
            </View>
            <View style={{ width: blockWidth }}>
                <CallDetailsCard
                    header={{
                        title: "LEAD STATUS",
                    }}
                    content=<View style={sts.rowT}>
                        <Verified size={16} color={AppColor.secondary} strokeWidth={2} />
                        <AppText>{leadStatusLabel}</AppText>
                    </View>
                />
            </View>
            <View style={{ width: "100%" }}>
                <CallDetailsCard
                    header={{
                        title: "Tags",
                        icon: Tags,
                    }}
                    content=<View style={sts.rowT}>
                        {tagList.length > 0 ? (
                            tagList.map((tag) => (
                                <TextBadge
                                    key={tag}
                                    text={tag}
                                    backgroundColor={AppColor.primary + "14"}
                                    textColor={AppColor.primary}
                                    borderColor={AppColor.primary + "40"}
                                />
                            ))
                        ) : (
                            <AppText variant="body-sm" muted>
                                No tags
                            </AppText>
                        )}
                    </View>
                />
            </View>
        </View>
    );
}

const sts = StyleSheet.create({
    rowT: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexShrink: 1,
        flexGrow: 0,
        flexWrap: "wrap",
    },
});
