import AppText from "@/features/common/components/text";
import { View } from "react-native";

type LeadsHeadderProps = {
    total?: number;
};

export default function LeadsHeadder({ total = 0 }: LeadsHeadderProps) {
    return (
        <View>
            <AppText variant="h1">Leads</AppText>
            <AppText variant="label" muted>
                {total} total leads
            </AppText>
        </View>
    );
}
