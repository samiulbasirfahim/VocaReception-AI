import { View, StyleSheet } from "react-native";
import LeadsIconWrapper from "./leads-icon-wrapper";
import { BellRing, Check, SatelliteDish } from "lucide-react-native";

export default function LeadsIcons() {
    return (
        <View style={sts.container}>
            <LeadsIconWrapper
                icon={BellRing}
                label="Urgent"
                count={3}
                textColor="#DC2626"
                backgroundColor="#FEE2E2"
            />

            <LeadsIconWrapper
                icon={SatelliteDish}
                label="New"
                count={2}
                textColor="#4F6EF7"
                backgroundColor="#EEF2FF"
            />

            <LeadsIconWrapper
                icon={Check}
                label="Qualified"
                count={3}
                textColor="#15803D"
                backgroundColor="#DCFCE7"
            />
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 8,
        width: "100%",
    },
});
