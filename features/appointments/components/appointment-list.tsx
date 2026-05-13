import { APPOINTMENTS } from "@/lib/fake-data";
import { StyleSheet, View } from "react-native";
import { Appointment } from "../type/appointment";
import { AppointmentListItem } from "./appointment-list-item";

type AppointmentListProps = {
    appointments?: Appointment[];
};

export default function AppointmentList({
    appointments = APPOINTMENTS,
}: AppointmentListProps) {
    return (
        <View style={[sts.container]}>
            {appointments.map((appointment) => (
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
