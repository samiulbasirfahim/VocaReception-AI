import AppText from "@/features/common/components/text";
import { LucideIcon } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

type LeadsIconWrapperProps = {
    icon: LucideIcon;
    label: string;
    count: number;
    textColor: string;
    backgroundColor: string;
};

export default function LeadsIconWrapper({
    icon: Icon,
    label,
    count,
    textColor,
    backgroundColor,
}: LeadsIconWrapperProps) {
    return (
        <View
            style={[
                sts.container,
                {
                    backgroundColor,
                },
            ]}
        >
            <Icon color={textColor} size={26} />
            <AppText
                variant="body"
                weight="semibold"
                style={{
                    color: textColor,
                }}
            >
                {label}
            </AppText>
            <AppText
                variant="h2"
                weight="extrabold"
                style={{
                    color: textColor,
                }}
            >
                {count}
            </AppText>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
        gap: 8,
        flex: 1,
    },
});
