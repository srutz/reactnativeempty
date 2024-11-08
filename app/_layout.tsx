
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeContainer } from "../components/SafeContainer";

export default function Layout() {
    return (
        <SafeContainer>
            <StatusBar></StatusBar>
            <GestureHandlerRootView>
                <Stack screenOptions={{ headerShown: !true }}></Stack>
            </GestureHandlerRootView>
        </SafeContainer>
    )
} 