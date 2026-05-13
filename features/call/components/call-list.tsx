import { StyleSheet, View } from "react-native";
import { Call } from "@/features/common/type/call";
import { CallListWrapper } from "./call-list-wrapper";

type CallListProps = {
    calls: Call[];
};

export default function CallList({ calls }: CallListProps) {
    return (
        <View style={[sts.container]}>
            {calls.map((call) => (
                <CallListWrapper key={call.id} call={call} />
            ))}
        </View>
    );
}
const sts = StyleSheet.create({
    container: {
        width: "100%",
        gap: 12,
        paddingTop: 12,
    },
});
