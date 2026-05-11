import { useAuthStore } from "@/features/auth/store/auth.store";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useInitAuth } from "../hooks/initAuth";

export function RootLayout() {
    const { accessToken } = useAuthStore();
    const { initializedAuth } = useInitAuth();

    if (!initializedAuth) {
        return null;
    }

    return (
        <KeyboardProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Protected guard={accessToken !== null}>
                    <Stack.Screen name="(protected)" />
                </Stack.Protected>
                <Stack.Protected guard={accessToken === null}>
                    <Stack.Screen name="(auth)" />
                </Stack.Protected>
            </Stack>
        </KeyboardProvider>
    );
}
