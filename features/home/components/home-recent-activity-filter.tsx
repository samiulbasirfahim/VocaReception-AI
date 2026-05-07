import { AppColor } from "@/constant/color";
import {
    ScrollableFilter,
    ScrollableFilterProps,
} from "@/features/common/components/scrollable-filter";
import AppText from "@/features/common/components/text";
import { StyleSheet, View } from "react-native";

export function HomeRecentActivityFilter(props: ScrollableFilterProps) {
    return (
        <View style={sts.container}>
            <AppText variant="h4">Recent Activity</AppText>
            <ScrollableFilter {...props} />
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: AppColor.background,
        marginBottom: -24,
    },
});
