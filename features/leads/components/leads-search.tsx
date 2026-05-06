import { AppColor } from "@/constant/color";
import { AppInput } from "@/features/common/components/input";
import { ScrollableFilter } from "@/features/common/components/scrollable-filter";
import { Search } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

type LeadsSearchProps = {
    onSearch: (query: string) => void;
    searchQuery?: string;
    filters: string[];
    selectedIdx: number;
    setSelectedIdx: (idx: number) => void;
};

export default function LeadsSearch({
    onSearch,
    filters,
    selectedIdx,
    setSelectedIdx,
}: LeadsSearchProps) {
    return (
        <View style={sts.container}>
            <AppInput
                leftIcon={Search}
                placeholder="Search calls..."
                onChangeText={onSearch}
            />

            <ScrollableFilter
                filters={filters}
                setSelectedIdx={setSelectedIdx}
                selectedIdx={selectedIdx}
            />
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        backgroundColor: AppColor.background,
        paddingVertical: 12,
    },
});
