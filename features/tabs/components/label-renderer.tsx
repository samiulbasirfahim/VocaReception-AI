import { AppColor } from "@/constant/color";
import AppText from "@/features/common/components/text";

type Props = {
    focused: boolean;
    color: string;
    position: "beside-icon" | "below-icon";
    children: string;
};

export default function TabLabelRender(props: Props) {
    return (
        <AppText
            variant="body-sm"
            center
            style={{
                color: props.focused ? AppColor.primary : AppColor.foreground_muted,
            }}
            {...props}
            adjustsFontSizeToFit
            numberOfLines={1}
        ></AppText>
    );
}
