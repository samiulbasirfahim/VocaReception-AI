import { StyleSheet, View } from "react-native";
import AppText from "./text";
import { Sparkles, TrendingUp } from "lucide-react-native";
import { AppColor } from "@/constant/color";

type Props = {
    title: string;
    description: string;
    footer?: string;
};

export function AiSection({ title, description, footer }: Props) {
    return (
        <View style={sts.container}>
            <View style={sts.titleContainer}>
                <Sparkles size={20} color={AppColor.background} />
                <AppText background variant="label">
                    {title}
                </AppText>
            </View>
            <AppText background variant="body-sm" weight="light">
                {description}
            </AppText>
            {footer && (
                <View style={sts.titleContainer}>
                    <TrendingUp size={20} color={AppColor.background} />
                    <AppText background variant="label">
                        {footer}
                    </AppText>
                </View>
            )}
        </View>
    );
}
const sts = StyleSheet.create({
    container: {
        padding: 12,
        gap: 14,
        backgroundColor: AppColor.primary,
        width: "100%",
        borderRadius: 12,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
});
