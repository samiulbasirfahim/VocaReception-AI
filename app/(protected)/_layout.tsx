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
        />
    );
}
