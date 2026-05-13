import { View, StyleSheet } from "react-native";
import LeadsIconWrapper from "./leads-icon-wrapper";
import { BellRing, Check, SatelliteDish } from "lucide-react-native";

type LeadsIconsProps = {
    urgent?: number;
    newCount?: number;
    qualified?: number;
};

export default function LeadsIcons({
    urgent = 0,
    newCount = 0,
    qualified = 0,
}: LeadsIconsProps) {
    return (
        <View style={sts.container}>
            <LeadsIconWrapper
                icon={BellRing}
                label="Urgent"
                count={urgent}
                textColor="#DC2626"
                backgroundColor="#FEE2E2"
            />

            <LeadsIconWrapper
                icon={SatelliteDish}
                label="New"
                count={newCount}
                textColor="#4F6EF7"
                backgroundColor="#EEF2FF"
            />

            <LeadsIconWrapper
                icon={Check}
                label="Qualified"
                count={qualified}
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
