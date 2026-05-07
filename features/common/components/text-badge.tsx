import { StyleSheet, View } from "react-native";
import AppText from "./text";

type TextBadgeProps = {
    text: string;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    lg?: boolean;
};

export function TextBadge({
    text,
    backgroundColor,
    borderColor,
    textColor,
    lg = false,
}: TextBadgeProps) {
    return (
        <View style={[sts.container, { backgroundColor, borderColor }]}>
            <AppText
                style={{
                    color: textColor,
                }}
                variant={lg ? "body" : "caption"}
                ellipsizeMode="tail"
                numberOfLines={1}
            >
                {text}
            </AppText>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        flexShrink: 1,
        flexGrow: 0,
    },
});
