import { AppColor } from "@/constant/color";
import { Eye, EyeOff, LucideIcon } from "lucide-react-native";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import AppText from "./text";

// ─── Sizes ────────────────────────────────────────────────────────────────────

type SizeKey = "sm" | "md" | "lg";

const SIZES: Record<
    SizeKey,
    {
        paddingVertical: number;
        paddingHorizontal: number;
        fontSize: number;
        borderRadius: number;
        iconOffset: number;
        iconSize: number;
    }
> = {
    sm: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        borderRadius: 8,
        iconOffset: 10,
        iconSize: 16,
    },
    md: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        borderRadius: 12,
        iconOffset: 12,
        iconSize: 20,
    },
    lg: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 18,
        borderRadius: 16,
        iconOffset: 14,
        iconSize: 22,
    },
};

// ─── Props ────────────────────────────────────────────────────────────────────

type AppInputProps = TextInputProps & {
    label?: string;
    hint?: string;
    errorMessage?: string;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    size?: SizeKey;
    fullWidth?: boolean;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AppInput({
    label,
    hint,
    errorMessage,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    size = "md",
    fullWidth = true,
    style,
    ...props
}: AppInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const sizeStyle = SIZES[size];
    const hasError = !!errorMessage && errorMessage.length > 0;
    const isPassword = props.secureTextEntry;
    const hasRightSlot = isPassword || !!RightIcon;

    return (
        <View style={fullWidth && { width: "100%" }}>
            {/* Label */}
            {!!label && (
                <AppText variant="label" style={{ marginBottom: 6 }}>
                    {label}
                </AppText>
            )}

            {/* Input row */}
            <View
                style={[
                    styles.container,
                    {
                        borderColor: hasError ? AppColor.error : "#D1D5DB",
                        borderRadius: sizeStyle.borderRadius,
                        backgroundColor: AppColor.background,
                    },
                ]}
            >
                {/* Left icon */}
                {LeftIcon && (
                    <View style={[styles.iconSlot, { left: sizeStyle.iconOffset }]}>
                        <LeftIcon
                            size={sizeStyle.iconSize}
                            color={AppColor.foreground_muted}
                        />
                    </View>
                )}

                {/* TextInput */}
                <TextInput
                    {...props}
                    secureTextEntry={isPassword && !showPassword}
                    placeholderTextColor={AppColor.foreground_muted}
                    style={[
                        styles.input,
                        {
                            fontSize: sizeStyle.fontSize,
                            paddingVertical: sizeStyle.paddingVertical,
                            paddingHorizontal: sizeStyle.paddingHorizontal,
                            color: AppColor.foreground,
                            paddingLeft: LeftIcon
                                ? sizeStyle.iconOffset + sizeStyle.iconSize + 8
                                : sizeStyle.paddingHorizontal,
                            paddingRight: hasRightSlot
                                ? sizeStyle.iconOffset + sizeStyle.iconSize + 8
                                : sizeStyle.paddingHorizontal,
                        },
                        style,
                    ]}
                />

                {/* Password toggle */}
                {isPassword && (
                    <Pressable
                        style={[styles.iconSlot, { right: sizeStyle.iconOffset }]}
                        onPress={() => setShowPassword((p) => !p)}
                        hitSlop={8}
                    >
                        {showPassword ? (
                            <EyeOff
                                size={sizeStyle.iconSize}
                                color={AppColor.foreground_muted}
                            />
                        ) : (
                            <Eye
                                size={sizeStyle.iconSize}
                                color={AppColor.foreground_muted}
                            />
                        )}
                    </Pressable>
                )}

                {/* Right icon (non-password) */}
                {RightIcon && !isPassword && (
                    <View style={[styles.iconSlot, { right: sizeStyle.iconOffset }]}>
                        <RightIcon
                            size={sizeStyle.iconSize}
                            color={AppColor.foreground_muted}
                        />
                    </View>
                )}
            </View>

            {/* Hint / Error */}
            {hasError ? (
                <AppText variant="caption" error style={{ marginTop: 4 }}>
                    {errorMessage}
                </AppText>
            ) : (
                !!hint && (
                    <AppText variant="caption" muted style={{ marginTop: 4 }}>
                        {hint}
                    </AppText>
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
    },
    input: {
        flex: 1,
    },
    iconSlot: {
        position: "absolute",
        zIndex: 1,
    },
});
