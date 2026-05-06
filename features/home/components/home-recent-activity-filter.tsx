import {
    ScrollableFilter,
    ScrollableFilterProps,
} from "@/features/common/components/scrollable-filter";
import AppText from "@/features/common/components/text";
import { View } from "react-native";

export function HomeRecentActivityFilter(props: ScrollableFilterProps) {
    return (
        <View>
            <AppText variant="h4">Recent Activity</AppText>
            <ScrollableFilter {...props} />
        </View>
    );
}
