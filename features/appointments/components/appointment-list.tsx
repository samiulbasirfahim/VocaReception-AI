import { APPOINTMENTS } from "@/lib/fake-data";
import { StyleSheet, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { AppointmentListItem } from "./appointment-list-item";

export default function AppointmentList() {
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
            {APPOINTMENTS.map((appointment) => (
                <AppointmentListItem key={appointment.id} appointment={appointment} />
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
