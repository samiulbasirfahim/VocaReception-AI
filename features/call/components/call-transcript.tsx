import AppText from "@/features/common/components/text";
import { AlignJustify, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { AppColor } from "@/constant/color";

type Props = {
    transcript: { speaker: string; text: string; isAI?: boolean }[];
};

export default function CallTranscript({ transcript }: Props) {
    const [contentHeight, setContentHeight] = useState(0);
    const isOpen = useSharedValue(false);

    const heightProgress = useDerivedValue(() =>
        withTiming(isOpen.value ? 1 : 0, { duration: 300 }),
    );

    const animatedContentStyle = useAnimatedStyle(() => ({
        height: heightProgress.value * contentHeight,
        opacity: heightProgress.value,
        overflow: "hidden",
    }));

    const animatedChevronStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${heightProgress.value * 180}deg` }],
    }));

    return (
        <View style={sts.container}>
            <TouchableOpacity
                style={sts.header}
                activeOpacity={0.7}
                onPress={() => (isOpen.value = !isOpen.value)}
            >
                <View style={sts.headerLeft}>
                    <AlignJustify size={18} color={AppColor.foreground} strokeWidth={2} />
                    <AppText style={sts.title}>Transcript</AppText>
                </View>
                <Animated.View style={animatedChevronStyle}>
                    <ChevronDown
                        size={18}
                        color={AppColor.foreground_muted}
                        strokeWidth={2}
                    />
                </Animated.View>
            </TouchableOpacity>

            <Animated.View style={animatedContentStyle}>
                <View
                    style={sts.content}
                    onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
                >
                    {transcript.map((entry, i) => (
                        <View key={i} style={sts.entry}>
                            {entry.isAI && <View style={sts.aiAccent} />}
                            <View style={sts.entryText}>
                                <AppText style={[sts.speaker, entry.isAI && sts.speakerAI]}>
                                    {entry.speaker}
                                </AppText>
                                <AppText style={sts.text}>"{entry.text}"</AppText>
                            </View>
                        </View>
                    ))}
                </View>
            </Animated.View>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        borderRadius: 16,
        width: "100%",
        backgroundColor: AppColor.background,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: AppColor.border,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: "700",
        color: AppColor.foreground,
    },
    content: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 16,
    },
    entry: {
        flexDirection: "row",
        gap: 10,
    },
    aiAccent: {
        width: 3,
        borderRadius: 99,
        backgroundColor: AppColor.secondary,
        alignSelf: "stretch",
    },
    entryText: {
        flex: 1,
        gap: 4,
    },
    speaker: {
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: 0.8,
        color: AppColor.foreground_muted,
    },
    speakerAI: {
        color: AppColor.secondary,
    },
    text: {
        fontSize: 14,
        color: AppColor.foreground,
        fontStyle: "italic",
        lineHeight: 20,
    },
});
