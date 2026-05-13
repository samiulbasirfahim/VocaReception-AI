import { ActivityIndicator, StyleSheet, View } from "react-native";
import AppText from "./text";
import { AppColor } from "@/constant/color";

type LoaderProps = {
    label?: string;
    size?: "small" | "large";
};

export default function Loader({ label, size = "large" }: LoaderProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={AppColor.primary} size={size} />
            {label ? (
                <AppText variant="label" muted>
                    {label}
                </AppText>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 16,
        width: "100%",
    },
});
