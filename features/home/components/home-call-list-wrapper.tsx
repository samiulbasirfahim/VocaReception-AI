import { AppColor } from "@/constant/color";
import { AppShadow } from "@/constant/shadow";
import CallListItem from "@/features/common/components/call-list-item";
import { Call } from "@/features/common/type/call";
import { StyleSheet, View } from "react-native";

type Props = {
    call: Call;
    total: number;
    index: number;
};

export function HomeCallListWrapper({ call, total, index }: Props) {
    const isLast = index === total - 1;
    const isFirst = index === 0;
    return (
        <View
            style={[
                sts.container,
                {
                    borderBottomEndRadius: isLast ? 12 : 0,
                    borderBottomStartRadius: isLast ? 12 : 0,
                    borderTopEndRadius: isFirst ? 12 : 0,
                    borderTopStartRadius: isFirst ? 12 : 0,
                    borderTopWidth: isFirst ? 1 : 0,
                },
            ]}
        >
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
