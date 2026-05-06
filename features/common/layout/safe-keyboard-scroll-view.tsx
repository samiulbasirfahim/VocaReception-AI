import { AppColor } from "@/constant/color";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { ScrollViewProps, ViewStyle, RefreshControl, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
    includeTopInsets?: boolean;
    noPadding?: boolean;
    children?: ReactNode[] | ReactNode;
    centered?: boolean;
    verticalCentered?: boolean;
    gap?: number;
    onScroll?: ScrollViewProps["onScroll"];
    onRefresh?: () => Promise<void>;
    bottomExtraPadding?: number;
    fixedHeaderIndices?: number[];
};

export default function SafeLayout({
    fixedHeaderIndices = [],
    includeTopInsets = false,
    noPadding = false,
    children = [],
    centered = false,
    verticalCentered = false,
    gap = 8,
    onScroll,
    onRefresh: onRefresh_,
    bottomExtraPadding = 0,
}: Props) {
    const { top } = useSafeAreaInsets();
    const [refreshing, setRefreshing] = useState(false);

    const paddingConf = useMemo<ViewStyle>(
        () => ({
            paddingTop: includeTopInsets ? top : noPadding ? 0 : 16,
            paddingBottom: noPadding ? 0 : 16 + bottomExtraPadding,
            paddingHorizontal: noPadding ? 0 : 16,
        }),
        [includeTopInsets, noPadding, top, bottomExtraPadding],
    );

    const childrenAlignMent = useMemo<ViewStyle>(
        () => ({
            justifyContent: verticalCentered ? "center" : "flex-start",
            alignItems: centered ? "center" : "flex-start",
        }),
        [centered, verticalCentered],
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await onRefresh_?.();
        setRefreshing(false);
    }, [onRefresh_]);

    return (
        <View style={{ flex: 1, backgroundColor: AppColor.background }}>
            <KeyboardAwareScrollView
                stickyHeaderIndices={fixedHeaderIndices}
                contentInset={{ top: top - 12 }}
                style={{ flex: 1 }}
                contentContainerStyle={{
                    ...paddingConf,
                    ...childrenAlignMent,
                    minHeight: "100%",
                    gap,
                }}
                onScroll={onScroll}
                refreshControl={
                    onRefresh_ ? (
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    ) : undefined
                }
            >
                {children}
            </KeyboardAwareScrollView>

            <LinearGradient
                colors={[
                    AppColor.background,
                    AppColor.background,
                    AppColor.background + "00",
                ]}
                pointerEvents="none"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: top + 16,
                    zIndex: 1,
                }}
            />
        </View>
    );
}
