import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "./text";
import { AppColor } from "@/constant/color";
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { createAnimatedComponent } from "react-native-reanimated";

const AnimatedLinearGradient = createAnimatedComponent(LinearGradient);

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
    const leftOpacity = useSharedValue(0);
    const rightOpacity = useSharedValue(0);

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
        const x = contentOffset.x;
        const maxX = contentSize.width - layoutMeasurement.width;

        leftOpacity.value = withTiming(x > 8 ? 1 : 0, { duration: 200 });
        rightOpacity.value = withTiming(x < maxX - 8 ? 1 : 0, { duration: 200 });
    };

    const leftStyle = useAnimatedStyle(() => ({
        opacity: leftOpacity.value,
    }));

    const rightStyle = useAnimatedStyle(() => ({
        opacity: rightOpacity.value,
    }));

    return (
        <View style={sts.wrapper}>
            <ScrollView
                horizontal
                contentContainerStyle={sts.container}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
            >
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

            <AnimatedLinearGradient
                colors={[AppColor.background, "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                pointerEvents="none"
                style={[sts.fade, sts.fadeLeft, leftStyle]}
            />
            <AnimatedLinearGradient
                colors={["transparent", AppColor.background]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                pointerEvents="none"
                style={[sts.fade, sts.fadeRight, rightStyle]}
            />
        </View>
    );
}

const sts = StyleSheet.create({
    wrapper: {
        position: "relative",
        height: 50,
    },
    container: {
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
        backgroundColor: AppColor.foreground,
    },
    fade: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 48,
        zIndex: 10,
    },
    fadeLeft: { left: 0 },
    fadeRight: { right: 0 },
});
