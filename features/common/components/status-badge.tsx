import { StyleSheet, View } from "react-native";
import AppText from "./text";
import { Status } from "../type/status";

const statusColors: Record<Status, string> = {
    A: "#F59E0B",
    B: "#10B981",
    C: "#3B82F6",
    D: "#EF4444",
};

type StatusProps = {
    status: keyof typeof statusColors;
};

export function StatusBadge({ status }: StatusProps) {
    const color = statusColors[status];

    return (
        <View style={[sts.container, { backgroundColor: color }]}>
            <AppText variant="caption" background>
                Class {status}
            </AppText>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
});
