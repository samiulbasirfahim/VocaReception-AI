import { AppButton } from "@/features/common/components/button";
import { AppInput } from "@/features/common/components/input";
import AppText from "@/features/common/components/text";
import SafeKeyboardScrollView from "@/features/common/layout/safe-keyboard-scroll-view";
import { useAuthStore } from "@/features/common/store/auth.store";
import { StyleSheet, View } from "react-native";

export default function LoginScreen() {
    const setRfToken = useAuthStore((x) => x.setRefreshToken);
    return (
        <SafeKeyboardScrollView centered verticalCentered>
            <AppText variant="h2" numberOfLines={1} center>
                Welcome Back
            </AppText>
            <AppText variant="body-sm" muted center>
                Sign in to your ----------
            </AppText>
            <View style={sts.divider} />
            <AppInput label="Email" placeholder="Enter your email..." />
            <AppInput label="Password" placeholder="********" secureTextEntry />
            <View style={sts.dividerSmall} />
            <AppButton fullWidth onPress={() => setRfToken("")}>
                Login
            </AppButton>
        </SafeKeyboardScrollView>
    );
}

const sts = StyleSheet.create({
    divider: {
        height: 50,
    },
    dividerSmall: {
        height: 25,
    },
});
