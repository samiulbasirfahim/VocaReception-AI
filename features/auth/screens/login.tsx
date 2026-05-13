import { AppButton } from "@/features/common/components/button";
import { AppInput } from "@/features/common/components/input";
import AppText from "@/features/common/components/text";
import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import { StyleSheet, View } from "react-native";
import { useLogin } from "../api/login";
import { useState } from "react";
import { LoginPaylod } from "../type/auth";

export default function LoginScreen() {
    const [err, setErr] = useState<string | null>(null);
    const { mutate, isPending } = useLogin(setErr);
    const [formData, setFormData] = useState<LoginPaylod>({
        username: "",
        password: "",
    });

    const disabled = !formData.username || !formData.password;

    return (
        <SafeLayout centered verticalCentered>
            <AppText variant="h2" numberOfLines={1} center>
                Welcome Back
            </AppText>
            <AppText variant="body-sm" muted center>
                Sign in to your account
            </AppText>
            <View style={sts.divider} />
            <AppInput
                label="Email"
                placeholder="Enter your email..."
                value={formData.username}
                onChangeText={(text) => setFormData((x) => ({ ...x, username: text }))}
            />
            <AppInput
                label="Password"
                placeholder="********"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => setFormData((x) => ({ ...x, password: text }))}
            />
            <View style={sts.dividerSmall} />
            <AppButton
                fullWidth
                onPress={() => mutate(formData)}
                disabled={disabled}
                loading={isPending}
            >
                Login
            </AppButton>
        </SafeLayout>
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
