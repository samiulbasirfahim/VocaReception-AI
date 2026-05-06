import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./text";
import { AppColor } from "@/constant/color";

export type ScrollableFilterProps = {
    filters: string[];
    selectedIdx: number;
    setSelectedIdx: (idx: number) => void;
};

export function ScrollableFilter({
    filters,
    selectedIdx,
    setSelectedIdx,
}: ScrollableFilterProps) {
    return (
        <ScrollView horizontal contentContainerStyle={sts.conatiner}>
            {filters.map((item, index) => (
                <TouchableOpacity
                    onPress={() => setSelectedIdx(index)}
                    key={index}
                    activeOpacity={0.75}
                    style={[sts.pill, selectedIdx === index && sts.pillSelected]}
                >
                    <AppText
                        variant="body-sm"
                        muted={selectedIdx !== index}
                        background={selectedIdx === index}
                    >
                        {item}
                    </AppText>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const sts = StyleSheet.create({
    conatiner: {
        gap: 12,
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 6,
    },
    pill: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#0000000D",
    },
    pillSelected: {
        backgroundColor: AppColor.primary,
    },
});
