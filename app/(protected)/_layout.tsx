import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: "(tab)",
};

export default function ProtectedLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="(tab)" />
            <Stack.Screen name="call-details" />
            <Stack.Screen
                name="calendar"
                options={{
                    presentation: "formSheet",
                    sheetCornerRadius: 16,
                    sheetElevation: 8,
                    sheetInitialDetentIndex: 0,
                    sheetAllowedDetents: "fitToContents",
                }}
            />
        </Stack>
    );
}
