import { AppColor } from "@/constant/color";
import { LucideIcon } from "lucide-react-native";
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";
import AppText from "./text";

// ─── Variants ─────────────────────────────────────────────────────────────────

type VariantKey = "primary" | "outline" | "ghost" | "success" | "danger";

const VARIANTS: Record<
    VariantKey,
    {
        backgroundColor: string;
        textColor: string;
        borderColor?: string;
    }
> = {
    primary: {
        backgroundColor: AppColor.primary,
        textColor: AppColor.primary_fg,
    },
    outline: {
        backgroundColor: "transparent",
        textColor: AppColor.foreground,
        borderColor: "#D1D5DB",
    },
    ghost: { backgroundColor: "transparent", textColor: AppColor.foreground },
    success: {
        backgroundColor: AppColor.success_bg,
        textColor: AppColor.success,
    },
    danger: { backgroundColor: AppColor.error_bg, textColor: AppColor.error },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

type SizeKey = "sm" | "md" | "lg";

const SIZES: Record<
    SizeKey,
    {
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        iconSize: number;
    }
> = {
    sm: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        iconSize: 14,
    },
    md: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        iconSize: 18,
    },
    lg: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 16,
        iconSize: 22,
    },
};

const SIZE_TO_TEXT_VARIANT = {
    sm: "caption",
    md: "label",
    lg: "body",
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

type AppButtonProps = TouchableOpacityProps & {
    variant?: VariantKey;
    size?: SizeKey;
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    children: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AppButton({
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    children,
    style,
    ...props
}: AppButtonProps) {
    const v = VARIANTS[variant];
    const s = SIZES[size];
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            activeOpacity={0.75}
            disabled={isDisabled}
            style={[
                styles.base,
                {
                    backgroundColor: v.backgroundColor,
                    borderWidth: v.borderColor ? 1 : 0,
                    borderColor: v.borderColor,
                    paddingVertical: s.paddingVertical,
                    paddingHorizontal: s.paddingHorizontal,
                    borderRadius: s.borderRadius,
                },
                fullWidth && styles.fullWidth,
                isDisabled && styles.disabled,
                style,
            ]}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={v.textColor} size="small" />
            ) : (
                <>
                    {LeftIcon && (
                        <View style={{ marginRight: 8 }}>
                            <LeftIcon size={s.iconSize} color={v.textColor} />
                        </View>
                    )}
                    <AppText
                        variant={SIZE_TO_TEXT_VARIANT[size]}
                        color={v.textColor}
                        weight="semibold"
                    >
                        {children}
                    </AppText>
                    {RightIcon && (
                        <View style={{ marginLeft: 8 }}>
                            <RightIcon size={s.iconSize} color={v.textColor} />
                        </View>
                    )}
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
    },
    fullWidth: {
        width: "100%",
        alignSelf: "stretch",
    },
    disabled: {
        opacity: 0.5,
    },
});
