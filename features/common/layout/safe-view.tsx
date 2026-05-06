import { AppColor } from "@/constant/color";
import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
    includeTopInsets?: boolean;
    children?: ReactNode[] | ReactNode;
    gap?: number;
    style?: ViewStyle;
};

export default function SafeViewLayout({
    includeTopInsets = false,
    children,
    gap = 8,
    style,
}: Props) {
    const { top } = useSafeAreaInsets();
    return (
        <View
            style={[
                {
                    flex: 1,
                    backgroundColor: AppColor.background,
                    paddingTop: includeTopInsets ? top + 16 : 16,
                    paddingHorizontal: 16,
                    gap,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}
