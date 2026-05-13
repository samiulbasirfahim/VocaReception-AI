import { AppColor } from "@/constant/color";
import { AppShadow } from "@/constant/shadow";
import { StatusBadge } from "@/features/common/components/status-badge";
import AppText from "@/features/common/components/text";
import { TextBadge } from "@/features/common/components/text-badge";
import { Calendar, Clock } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Appointment } from "../type/appointment";

type AppointmentListItemProps = {
    appointment: Appointment;
};

export function AppointmentListItem({ appointment }: AppointmentListItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const startDate = appointment.startTime
        ? new Date(appointment.startTime)
        : appointment.date;
    const endDate = appointment.endTime ? new Date(appointment.endTime) : null;
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(startDate);

    const formattedRange = endDate
        ? `${formattedDate} - ${new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
        }).format(endDate)}`
        : formattedDate;

    const contactName = appointment.contact?.name || "Unknown";
    const contactEmail = appointment.contact?.email || "No email";
    const contactPhone = appointment.contact?.phone || "No phone";
    const noteCount = appointment.contactNotes?.length ?? 0;
    const firstNote = appointment.contactNotes?.[0]?.body || "";
    const appointmentStatusLabel = appointment.appointmentStatus || "Unknown";
    const bookingStatusLabel =
        appointment.bookingStatus || appointment.description || "Unknown";
    const normalizedGroup =
        appointment.group === "A" ||
        appointment.group === "B" ||
        appointment.group === "C" ||
        appointment.group === "D"
            ? appointment.group
            : "D";

    return (
        <Pressable
            onPress={() => setIsExpanded((prev) => !prev)}
            style={({ pressed }) => [sts.container, pressed && sts.pressed]}
        >
            <View style={sts.topRow}>
                <View style={sts.iconWrapper}>
                    <Calendar color={AppColor.background} />
                </View>
                <View style={sts.rightContainer}>
                    <View style={sts.row}>
                        <AppText
                            variant="body"
                            numberOfLines={1}
                            weight="bold"
                            style={{
                                flexShrink: 1,
                                flexGrow: 0,
                            }}
                        >
                            {appointment.title}
                        </AppText>

                        <StatusBadge status={normalizedGroup} />
                    </View>

                    <View style={sts.row}>
                        <View style={sts.textBottomContainer}>
                            <Clock color={AppColor.foreground_muted} size={14} />
                            <AppText variant="caption">{formattedDate}</AppText>
                        </View>

                        <TextBadge
                            text={bookingStatusLabel}
                            backgroundColor={AppColor.primary + "20"}
                            borderColor={AppColor.border}
                            textColor={AppColor.primary}
                        />
                    </View>
                </View>
            </View>
            {isExpanded && (
                <View style={sts.expandedContainer}>
                    <AppText variant="body" weight="bold" numberOfLines={2}>
                        {appointment.title}
                    </AppText>
                    <View style={sts.detailRow}>
                        <AppText variant="label" muted>
                            Time
                        </AppText>
                        <AppText variant="body-sm">{formattedRange}</AppText>
                    </View>
                    <View style={sts.detailRow}>
                        <AppText variant="label" muted>
                            Name
                        </AppText>
                        <AppText variant="body-sm">{contactName}</AppText>
                    </View>
                    <View style={sts.detailRow}>
                        <AppText variant="label" muted>
                            Email
                        </AppText>
                        <AppText variant="body-sm">{contactEmail}</AppText>
                    </View>
                    <View style={sts.detailRow}>
                        <AppText variant="label" muted>
                            Phone
                        </AppText>
                        <AppText variant="body-sm">{contactPhone}</AppText>
                    </View>
                    <View style={sts.detailRow}>
                        <AppText variant="label" muted>
                            Appointment status
                        </AppText>
                        <AppText variant="body-sm">{appointmentStatusLabel}</AppText>
                    </View>
                    <View style={sts.detailRow}>
                        <AppText variant="label" muted>
                            Booking status
                        </AppText>
                        <AppText variant="body-sm">{bookingStatusLabel}</AppText>
                    </View>
                    {appointment.group ? (
                        <View style={sts.detailRow}>
                            <AppText variant="label" muted>
                                Group
                            </AppText>
                            <AppText variant="body-sm">{appointment.group}</AppText>
                        </View>
                    ) : null}
                    {appointment.reason ? (
                        <View style={sts.detailRow}>
                            <AppText variant="label" muted>
                                Reason
                            </AppText>
                            <AppText variant="body-sm">{appointment.reason}</AppText>
                        </View>
                    ) : null}
                    {noteCount > 0 ? (
                        <View style={sts.detailRow}>
                            <AppText variant="label" muted>
                                Notes
                            </AppText>
                            <AppText variant="body-sm">
                                {noteCount} note{noteCount === 1 ? "" : "s"}
                            </AppText>
                        </View>
                    ) : null}
                    {appointment.callerSummary ? (
                        <View style={sts.summaryBlock}>
                            <AppText variant="label" muted>
                                Summary
                            </AppText>
                            <AppText variant="body-sm">{appointment.callerSummary}</AppText>
                        </View>
                    ) : null}
                    {!appointment.callerSummary && firstNote ? (
                        <View style={sts.summaryBlock}>
                            <AppText variant="label" muted>
                                Note
                            </AppText>
                            <AppText variant="body-sm">{firstNote}</AppText>
                        </View>
                    ) : null}
                </View>
            )}
        </Pressable>
    );
}

const sts = StyleSheet.create({
    container: {
        gap: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: AppColor.border,
        backgroundColor: AppColor.background,
        padding: 8,
        ...AppShadow.xs,
        width: "100%",
    },
    pressed: {
        opacity: 0.9,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    iconWrapper: {
        backgroundColor: AppColor.foreground,
        padding: 12,
        borderRadius: 10,
        alignSelf: "center",
    },
    rightContainer: {
        gap: 4,
        flex: 1,
    },
    expandedContainer: {
        marginTop: 10,
        gap: 8,
        width: "100%",
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },
    summaryBlock: {
        gap: 6,
        paddingTop: 4,
    },
    textBottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },
});
