import { AppColor } from "@/constant/color";
import { AppShadow } from "@/constant/shadow";
import AppText from "@/features/common/components/text";
import { LucideIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
    header: {
        title: string;
        icon?: LucideIcon;
    };
    content: ReactNode;
};

export default function CallDetailsCard({ header, content }: Props) {
    return (
        <View style={sts.container}>
            <View style={sts.rowT}>
                {header.icon && (
                    <header.icon color={AppColor.foreground_muted} size={16} />
                )}
                <AppText variant="overline" muted size={12}>
                    {header.title}
                </AppText>
            </View>
            <View style={sts.rowT}>{content}</View>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        backgroundColor: AppColor.background,
        padding: 8,
        paddingVertical: 12,
        gap: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: AppColor.border,
        ...AppShadow.sm,
    },

    rowT: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexShrink: 1,
        flexGrow: 0,
    },
});
