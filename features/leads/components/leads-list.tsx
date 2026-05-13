import { LEADS } from "@/lib/fake-data";
import { StyleSheet, View } from "react-native";
import LeadsListItem from "./leads-list-item";
import { Lead } from "../type/lead";

type LeadsListProps = {
    leads?: Lead[];
};

export default function LeadsList({ leads = LEADS }: LeadsListProps) {
    return (
        <View style={[sts.container]}>
            {leads.map((lead) => (
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
