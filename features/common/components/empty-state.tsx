import { AppColor } from "@/constant/color";
import { Inbox } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import AppText from "./text";

type EmptyStateProps = {
    title?: string;
    description?: string;
};

export default function EmptyState({
    title = "No results",
    description = "Try adjusting your search or filters.",
}: EmptyStateProps) {
    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <Inbox size={28} color={AppColor.foreground_muted} />
            </View>
            <AppText variant="body" weight="semibold">
                {title}
            </AppText>
            <AppText variant="caption" muted style={styles.description}>
                {description}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 24,
        width: "100%",
    },
    iconWrapper: {
        height: 44,
        width: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColor.background,
        marginBottom: 4,
    },
    description: {
        textAlign: "center",
        color: AppColor.foreground_muted,
    },
});
