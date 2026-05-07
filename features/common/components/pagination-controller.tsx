import { AppColor } from "@/constant/color";
import { AppShadow } from "@/constant/shadow";
import { StyleSheet, View } from "react-native";
import AppText from "./text";
import { AppButton } from "./button";

type PaginationControllerProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function PaginationController({
    page,
    totalPages,
    onPageChange,
}: PaginationControllerProps) {
    return (
        <View style={sts.contianer}>
            <AppButton
                size="sm"
                disabled={page <= 1}
                onPress={() => onPageChange(page - 1)}
            >
                Prev
            </AppButton>
            <AppText variant="label" muted>
                {page} / {totalPages}
            </AppText>
            <AppButton
                size="sm"
                disabled={page === totalPages}
                onPress={() => onPageChange(page + 1)}
            >
                Next
            </AppButton>
        </View>
    );
}

const sts = StyleSheet.create({
    contianer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: 8,
        backgroundColor: AppColor.background,
        borderRadius: 12,
        alignSelf: "center",
        ...AppShadow.sm,
    },
});
