import AppText from "@/features/common/components/text";
import { StyleSheet, View } from "react-native";
import { mapGreetings } from "../utils/map-greeting";
import { useState } from "react";

export default function HomeHeader() {
    const greeting = mapGreetings(new Date().getHours());
    const [name, setName] = useState<string>("raju");
    return (
        <View style={sts.container}>
            <AppText variant="label" muted>
                {greeting}
            </AppText>
            <AppText variant="h1">Hello, {name}</AppText>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        gap: 4,
    },
});
