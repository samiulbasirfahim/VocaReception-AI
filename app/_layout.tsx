import { useAuthStore } from "@/features/common/store/auth.store";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
    const isLoggedIn = useAuthStore((x) => x.isLoggedIn);
    return (
        <KeyboardProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Protected guard={isLoggedIn}>
                    <Stack.Screen name="(protected)" />
                </Stack.Protected>
                <Stack.Protected guard={!isLoggedIn}>
                    <Stack.Screen name="(auth)" />
                </Stack.Protected>
            </Stack>
        </KeyboardProvider>
    );
}
