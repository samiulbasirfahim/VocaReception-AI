import { StyleSheet, View } from "react-native";
import { Lead } from "../type/lead";
import { AppColor } from "@/constant/color";
import { AppShadow } from "@/constant/shadow";
import AppText from "@/features/common/components/text";
import { TextBadge } from "@/features/common/components/text-badge";
import { mapLeadStatus } from "../utils/map-lead-status";
import { mapLeadPriority } from "../utils/map-lead-priority";
import { mapLeadType } from "../utils/map-lead-type";

type Props = {
    lead: Lead;
};

export default function LeadsListItem({ lead }: Props) {
    const status: Lead["status"] = lead.status;
    const priority: Lead["priority"] = lead.priority;
    const type: Lead["type"] = lead.type;
    const mappedType = mapLeadType(type);
    const mappedPriority = mapLeadPriority(priority);
    const mappedStatus = mapLeadStatus(status);

    return (
        <View style={sts.container}>
            <View style={sts.row}>
                <AppText variant="body" weight="bold">
                    {lead.title}
                </AppText>

                <TextBadge
                    text={mappedPriority.label}
                    backgroundColor={mappedPriority.bgColor}
                    textColor={mappedPriority.textColor}
                    borderColor={mappedPriority.textColor + "50"}
                />
            </View>
            <View style={sts.row}>
                <TextBadge
                    text={mappedType.label}
                    backgroundColor={mappedType.bgColor}
                    textColor={mappedType.textColor}
                    borderColor={mappedType.textColor + "50"}
                />
            </View>
            <View style={sts.divider} />
            <View style={sts.row}>
                <AppText variant="label" muted>
                    Last contact: 
                </AppText>
                <TextBadge
                    text={mappedStatus.label}
                    backgroundColor={mappedStatus.bgColor}
                    textColor={mappedStatus.textColor}
                    borderColor={mappedStatus.textColor + "50"}
                />
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
        padding: 8,
        ...AppShadow.xs,
        width: "100%",
    },
    divider: {
        height: 1,
        backgroundColor: AppColor.border,
        width: "100%",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },
});
