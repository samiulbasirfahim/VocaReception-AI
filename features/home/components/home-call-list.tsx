import { StyleSheet, View } from "react-native";
import { CALLS } from "@/lib/fake-data";
import { HomeCallListWrapper } from "./home-call-list-wrapper";

export default function HomeCallList() {
    return (
        <View style={sts.container}>
            {CALLS.map((call, i) => (
                <HomeCallListWrapper
                    key={call.id}
                    call={call}
                    total={CALLS.length}
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
    },
});
