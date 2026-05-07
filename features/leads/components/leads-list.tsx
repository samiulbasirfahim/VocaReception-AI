import { LEADS } from "@/lib/fake-data";
import { StyleSheet, View } from "react-native";
import LeadsListItem from "./leads-list-item";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function LeadsList() {
    const tabHeight = useBottomTabBarHeight();
    return (
        <View
            style={[
                sts.container,
                {
                    paddingBottom: tabHeight + 12,
                },
            ]}
        >
            {LEADS.map((lead) => (
                <LeadsListItem key={lead.id} lead={lead} />
            ))}
        </View>
    );
}
const sts = StyleSheet.create({
    container: {
        width: "100%",
        gap: 12,
    },
});
