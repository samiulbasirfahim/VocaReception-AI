import { AppColor } from "@/constant/color";
import { Text, TextProps, TextStyle } from "react-native";

type VariantKey =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "body"
    | "body-sm"
    | "label"
    | "caption"
    | "overline";

const VARIANTS: Record<VariantKey, TextStyle> = {
    h1: { fontSize: 32, fontWeight: "700", lineHeight: 40 },
    h2: { fontSize: 28, fontWeight: "700", lineHeight: 36 },
    h3: { fontSize: 24, fontWeight: "600", lineHeight: 32 },
    h4: { fontSize: 20, fontWeight: "600", lineHeight: 28 },
    body: { fontSize: 16, fontWeight: "400", lineHeight: 24 },
    "body-sm": { fontSize: 14, fontWeight: "400", lineHeight: 20 },
    label: { fontSize: 14, fontWeight: "500", lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: "400", lineHeight: 16 },
    overline: {
        fontSize: 11,
        fontWeight: "600",
        lineHeight: 16,
        letterSpacing: 1.2,
        textTransform: "uppercase",
    },
};

type WeightKey =
    | "thin"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold";

const WEIGHTS: Record<WeightKey, TextStyle["fontWeight"]> = {
    thin: "100",
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
};

// ─── Color shortcuts → AppColor token ────────────────────────────────────────

const COLOR_SHORTCUTS = {
    primary: AppColor.primary,
    success: AppColor.success,
    error: AppColor.error,
    warning: AppColor.warning,
    muted: AppColor.foreground_muted,
    background: AppColor.background,
} as const;

type ColorShortcut = keyof typeof COLOR_SHORTCUTS;

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = TextProps & {
    variant?: VariantKey;
    weight?: WeightKey;
    color?: string;
    size?: number;
    align?: TextStyle["textAlign"];
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    opacity?: number;
    uppercase?: boolean;
    capitalize?: boolean;
    center?: boolean; // ← add
} & {
    // boolean shortcut — e.g. <AppText primary> instead of color="#4F46E5"
    [K in ColorShortcut]?: boolean;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AppText({
    variant = "body",
    weight,
    color,
    size,
    align,
    italic,
    underline,
    strikethrough,
    opacity,
    uppercase,
    capitalize,
    style,
    // shortcut booleans
    primary,
    success,
    error,
    warning,
    background,
    muted,
    center,
    ...rest
}: Props) {
    // explicit color > shortcut boolean > default foreground
    const resolvedColor =
        color ??
        (primary
            ? COLOR_SHORTCUTS.primary
            : success
                ? COLOR_SHORTCUTS.success
                : error
                    ? COLOR_SHORTCUTS.error
                    : warning
                        ? COLOR_SHORTCUTS.warning
                        : muted
                            ? COLOR_SHORTCUTS.muted
                            : background
                                ? COLOR_SHORTCUTS.background
                                : AppColor.foreground);

    const textDecoration: TextStyle["textDecorationLine"] =
        underline && strikethrough
            ? "underline line-through"
            : underline
                ? "underline"
                : strikethrough
                    ? "line-through"
                    : "none";

    return (
        <Text
            style={[
                VARIANTS[variant],
                { color: resolvedColor, alignSelf: center ? "center" : "auto" },
                weight && { fontWeight: WEIGHTS[weight] },
                size !== undefined && { fontSize: size },
                opacity !== undefined && { opacity },
                align && { textAlign: align },
                italic && { fontStyle: "italic" },
                { textDecorationLine: textDecoration },
                (uppercase || capitalize) && {
                    textTransform: uppercase ? "uppercase" : "capitalize",
                },
                style,
            ]}
            {...rest}
        />
    );
}
