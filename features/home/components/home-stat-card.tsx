import { AppColor } from "@/constant/color";
import AppText from "@/features/common/components/text";
import { mapLeadingSign } from "@/features/common/utils/map-leading-sign";
import { CheckCircle, LucideIcon, PhoneCall } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

type Props = {
    icon: LucideIcon;
    iconBg: string;
    iconFg: string;
    amount: number;
    description: string;
    amountToday: number;
};

function HomeStatCard({
    icon: Icon,
    iconFg,
    description,
    amount,
    iconBg,
    amountToday,
}: Props) {
    return (
        <View style={sts.container}>
            <View
                style={[
                    sts.iconWrapper,
                    {
                        backgroundColor: iconBg,
                    },
                ]}
            >
                <Icon color={iconFg} />
            </View>
            <AppText variant="h2">{amount}</AppText>
            <AppText variant="body" muted>
                {description}
            </AppText>
            <AppText style={{ color: iconFg }} variant="label">
                {mapLeadingSign(amountToday)} today
            </AppText>
        </View>
    );
}

export function HomeStatCards() {
    return (
        <View style={sts.outerContainer}>
            <HomeStatCard
                amountToday={12}
                description="Calls"
                amount={3}
                iconBg="#EEF2FF"
                iconFg="#2563EB"
                icon={PhoneCall}
            />
            <HomeStatCard
                amountToday={12}
                description="Booked"
                amount={3}
                iconBg="#DCFCE7"
                iconFg="#16A34A"
                icon={CheckCircle}
            />
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        padding: 8,
        borderRadius: 12,
        borderColor: AppColor.border,
        borderWidth: 1,
        gap: 4,
    },
    iconWrapper: {
        padding: 8,
        borderRadius: 8,
    },
    outerContainer: {
        flexDirection: "row",
        gap: 12,
    },
});
