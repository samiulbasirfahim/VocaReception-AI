import { AppInput } from "@/features/common/components/input";
import { ScrollableFilter } from "@/features/common/components/scrollable-filter";
import AppText from "@/features/common/components/text";
import { Search } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

type CallHeaderProps = {
    onSearch: (query: string) => void;
    searchQuery?: string;
    filters: string[];
    selectedIdx: number;
    setSelectedIdx: (idx: number) => void;
};

export default function CallHeader({
    onSearch,
    filters,
    selectedIdx,
    setSelectedIdx,
}: CallHeaderProps) {
    return (
        <View style={sts.container}>
            <AppText variant="h1">Call</AppText>

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
        gap: 14,
    },
});
