import { AppColor } from "@/constant/color";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { ScrollViewProps, ViewStyle, RefreshControl } from "react-native";
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
};

export default function SafeKeyboardScrollView({
    includeTopInsets = false,
    noPadding = false,
    children = [],
    centered = false,
    verticalCentered = false,
    gap = 8,
    onScroll,
    onRefresh: onRefresh_,
}: Props) {
    const { top } = useSafeAreaInsets();
    const [refreshing, setRefreshing] = useState(false);
    const paddingConf = useMemo<ViewStyle>(
        () => ({
            paddingTop: includeTopInsets
                ? top + (noPadding ? 0 : 16)
                : noPadding
                    ? 0
                    : 16,
            paddingBottom: noPadding ? 0 : 16,
            paddingHorizontal: noPadding ? 0 : 16,
        }),
        [includeTopInsets, noPadding, top],
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
    }, []);

    return (
        <KeyboardAwareScrollView
            style={{
                flex: 1,
                backgroundColor: AppColor.background,
            }}
            contentContainerStyle={{
                ...paddingConf,
                ...childrenAlignMent,
                flex: 1,
                gap,
            }}
            onScroll={onScroll}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {children}
        </KeyboardAwareScrollView>
    );
}
