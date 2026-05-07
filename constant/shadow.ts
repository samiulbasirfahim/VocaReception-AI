import { Platform } from "react-native";
import { AppColor } from "./color";

export const AppShadow = {
    xs: Platform.select({
        ios: {
            shadowColor: AppColor.border,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.06,
            shadowRadius: 2,
        },
        android: {
            elevation: 1,
            shadowColor: AppColor.border,
        },
    }),
    sm: Platform.select({
        ios: {
            shadowColor: AppColor.border,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
        },
        android: {
            elevation: 2,
            shadowColor: AppColor.border,
        },
    }),
    md: Platform.select({
        ios: {
            shadowColor: AppColor.foreground_muted,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
        },
        android: {
            elevation: 4,
            shadowColor: AppColor.foreground_muted,
        },
    }),
};
