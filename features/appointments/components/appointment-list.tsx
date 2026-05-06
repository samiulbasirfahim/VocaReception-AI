import { APPOINTMENTS } from "@/lib/fake-data";
import { LegendList } from "@legendapp/list";
import { AppointmentListItem } from "./appointment-list-item";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";

export default function AppointmentList() {
    const tabHeight = useBottomTabBarHeight();
    return (
        <LegendList
            onRefresh={() => new Promise((res) => setTimeout(res, 1000))}
            drawDistance={500}
            contentContainerStyle={[
                sts.contentContainerStyle,
                {
                    paddingBottom: tabHeight + 12,
                },
            ]}
            data={APPOINTMENTS}
            renderItem={(item) => <AppointmentListItem appointment={item.item} />}
            keyExtractor={(item) => item.id}
            recycleItems
            style={sts.listContainer}
        />
    );
}

const sts = StyleSheet.create({
    listContainer: {
        flex: 1,
        width: "100%",
    },
    contentContainerStyle: {
        gap: 12,
    },
});
