import { RootLayout } from "@/features/auth/layout/root-layout";
import { queryClient } from "@/features/common/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.setOptions({
    fade: false,
    duration: 0,
});

SplashScreen.preventAutoHideAsync();
export default function RootWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <RootLayout />
        </QueryClientProvider>
    );
}
