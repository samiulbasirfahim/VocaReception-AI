import AppText from "@/features/common/components/text";
import { View } from "react-native";

export default function LeadsHeadder() {
    return (
        <View>
            <AppText variant="h1">Leads</AppText>
            <AppText variant="label" muted>
                6 qualified leads
            </AppText>
        </View>
    );
}
