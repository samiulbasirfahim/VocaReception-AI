import AppText from "@/features/common/components/text";
import EmptyState from "@/features/common/components/empty-state";
import { Call } from "@/features/common/type/call";
import { StyleSheet, View } from "react-native";
import { HomeCallListWrapper } from "./home-call-list-wrapper";

type Props = {
    calls: Call[];
};

export default function HomeCallList({ calls }: Props) {
    if (calls.length === 0) {
        return (
            <View style={sts.container}>
                <AppText variant="h4">Recent Activity</AppText>
                <EmptyState
                    title="No recent activity"
                    description="New calls will show up here as they happen."
                />
            </View>
        );
    }

    return (
        <View style={sts.container}>
            <AppText variant="h4">Recent Activity</AppText>
            {calls.map((call, i) => (
                <HomeCallListWrapper
                    key={call.id}
                    call={call}
                    total={calls.length}
                    index={i}
                />
            ))}
        </View>
    );
}
const sts = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: 12,
        gap: 12,
    },
});
