import AppText from "@/features/common/components/text";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { mapGreetings } from "../utils/map-greeting";
import { SquareArrowRightExit } from "lucide-react-native";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { queryClient } from "@/features/common/utils/queryClient";
import { AppColor } from "@/constant/color";

export default function HomeHeader() {
    const greeting = mapGreetings(new Date().getHours());
    const [name] = useState<string>("User");
    const clearStore = useAuthStore((x) => x.clearTokens);
    const handleLogout = () => {
        clearStore();
        queryClient.clear();
    };
    return (
        <View style={sts.containerWrapper}>
            <View style={sts.container}>
                <AppText variant="label" muted>
                    {greeting}
                </AppText>
                <AppText variant="h1">Hello, {name}</AppText>
            </View>
            <TouchableOpacity activeOpacity={0.75} onPress={handleLogout}>
                <SquareArrowRightExit size={24} color={AppColor.error} />
            </TouchableOpacity>
        </View>
    );
}

const sts = StyleSheet.create({
    containerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    container: {
        gap: 4,
    },
});
