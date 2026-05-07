import { AppColor } from "@/constant/color";
import { AppShadow } from "@/constant/shadow";
import CallListItem from "@/features/common/components/call-list-item";
import { Call } from "@/features/common/type/call";
import { StyleSheet, View } from "react-native";

type Props = {
    call: Call;
};

export function CallListWrapper({ call }: Props) {
    return (
        <View style={sts.container}>
            <CallListItem call={call} />
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        width: "100%",
        ...AppShadow.xs,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: AppColor.border,
        backgroundColor: AppColor.background,
        overflow: "hidden",
    },
});
