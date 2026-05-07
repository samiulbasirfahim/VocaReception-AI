import AppText from "@/features/common/components/text";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CallDetailsCard from "./call-details-card";
import {
    Calendar,
    CheckCircle,
    Mail,
    Tags,
    Verified,
} from "lucide-react-native";
import { TextBadge } from "@/features/common/components/text-badge";
import { mapCallReason } from "@/features/common/utils/map-call-reason";
import { AppColor } from "@/constant/color";

const GAP = 12;
const COLUMNS = 2;

export default function CallDetailsCards() {
    const [blockWidth, setBlockWidth] = useState(0);
    const mappedReason = mapCallReason("tex-preparation");

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
                        <AppText>May, 12</AppText>
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
                        <AppText>Qualified Lead</AppText>
                    </View>
                />
            </View>
            <View style={{ width: blockWidth }}>
                <CallDetailsCard
                    header={{
                        title: "LEAD STATUS",
                    }}
                    content=<View style={sts.rowT}>
                        <Verified />
                        <AppText>Qualified Lead</AppText>
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
                        <TextBadge
                            text="Important"
                            backgroundColor={AppColor.error}
                            textColor={AppColor.background}
                            borderColor={AppColor.error + "50"}
                        />
                        <TextBadge
                            text="Important"
                            backgroundColor={AppColor.error}
                            textColor={AppColor.background}
                            borderColor={AppColor.error + "50"}
                        />
                        <TextBadge
                            text="Important"
                            backgroundColor={AppColor.error}
                            textColor={AppColor.background}
                            borderColor={AppColor.error + "50"}
                        />
                        <TextBadge
                            text="Important"
                            backgroundColor={AppColor.error}
                            textColor={AppColor.background}
                            borderColor={AppColor.error + "50"}
                        />
                        <TextBadge
                            text="Important"
                            backgroundColor={AppColor.error}
                            textColor={AppColor.background}
                            borderColor={AppColor.error + "50"}
                        />
                        <TextBadge
                            text="Important"
                            backgroundColor={AppColor.error}
                            textColor={AppColor.background}
                            borderColor={AppColor.error + "50"}
                        />
                        <TextBadge
                            text="Important"
                            backgroundColor={AppColor.error}
                            textColor={AppColor.background}
                            borderColor={AppColor.error + "50"}
                        />
                        <TextBadge
                            text="Important"
                            backgroundColor={AppColor.error}
                            textColor={AppColor.background}
                            borderColor={AppColor.error + "50"}
                        />
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
