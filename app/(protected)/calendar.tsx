import { AppColor } from "@/constant/color";
import { useCalendarStore } from "@/features/appointments/store/params.store";
import AppText from "@/features/common/components/text";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";

export default function Calendar() {
    const defaultStyles = useDefaultStyles("dark");
    const { bottom } = useSafeAreaInsets();

    const { startDate, endDate, setRange, getDates, isHydrated } =
        useCalendarStore();

    const { start: startJSDate, end: endJSDate } = getDates();

    if (!isHydrated) {
        return (
            <View style={[sts.container, sts.center]}>
                <ActivityIndicator color={AppColor.primary} />
            </View>
        );
    }

    const getRangeText = () => {
        if (!startJSDate) return "Select a start date";

        const options: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
            year: "numeric",
        };

        const startString = startJSDate.toLocaleDateString("en-US", options);

        if (!endJSDate) return `${startString} - ...`;

        const endString = endJSDate.toLocaleDateString("en-US", options);

        return `${startString} — ${endString}`;
    };

    return (
        <View style={sts.container}>
            <DateTimePicker
                mode="range"
                startDate={startDate} // Stored as ISO String
                endDate={endDate} // Stored as ISO String
                styles={{
                    ...defaultStyles,
                }}
                onChange={({ startDate, endDate }) => {
                    setRange(startDate, endDate);
                }}
            />

            <View style={[sts.bottomBar]}>
                <View style={sts.divider} />
                <View style={sts.contentRow}>
                    <View>
                        <AppText style={sts.label}>Selected Period</AppText>
                        <AppText style={sts.dateText}>{getRangeText()}</AppText>
                    </View>
                </View>
            </View>

            {/* Safe Area Spacer */}
            <View style={{ height: bottom + 32 }} />
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        backgroundColor: AppColor.foreground,
        paddingTop: 16,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: 200,
    },
    bottomBar: {
        marginTop: 8,
        paddingHorizontal: 20,
    },
    divider: {
        height: 1,
        backgroundColor: AppColor.border,
        marginBottom: 12,
        opacity: 0.3,
    },
    contentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: 11,
        color: AppColor.foreground_muted,
        marginBottom: 2,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    dateText: {
        fontSize: 15,
        fontWeight: "600",
        color: AppColor.primary_fg,
    },
});
