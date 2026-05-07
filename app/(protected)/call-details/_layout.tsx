import { AppColor } from "@/constant/color";
import { AppShadow } from "@/constant/shadow";
import AppText from "@/features/common/components/text";
import { Stack } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CallDetailsLayout() {
    const top = useSafeAreaInsets().top;
    return (
        <Stack
            screenOptions={{
                title: `Call Details`,
                header(props) {
                    return (
                        <View
                            style={[
                                sts.container,
                                {
                                    paddingTop: top,
                                    height: 56 + top,
                                },
                            ]}
                        >
                            <View style={sts.childrenContainer}>
                                <TouchableOpacity
                                    style={sts.backButtonWrapper}
                                    onPress={props.navigation.goBack}
                                >
                                    <ArrowLeft color={AppColor.foreground_muted} size={24} />
                                </TouchableOpacity>
                                <AppText style={sts.centerTitle}>Call Details</AppText>
                            </View>
                        </View>
                    );
                },
            }}
        />
    );
}

const sts = StyleSheet.create({
    container: {
        backgroundColor: AppColor.background,
    },
    childrenContainer: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    backButtonWrapper: {
        padding: 8,
        backgroundColor: AppColor.background,
        alignSelf: "flex-start",
        borderRadius: 12,
        // borderWidth: 1,
        // borderColor: AppColor.border + "50",
        ...AppShadow.md,
        zIndex: 10,
    },
    centerTitle: {
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        pointerEvents: "none",
    },
});
