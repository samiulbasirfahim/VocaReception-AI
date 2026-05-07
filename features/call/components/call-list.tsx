import { StyleSheet, View } from "react-native";
import { CALLS } from "@/lib/fake-data";
import { CallListWrapper } from "./call-list-wrapper";

export default function CallList() {
    return (
        <View style={[sts.container]}>
            {CALLS.map((call) => (
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
