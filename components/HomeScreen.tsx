import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, Text, View } from "react-native";
import GithubLogin from "./GithubLogin";

export function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-gray-200 items-center justify-center">
            <View className="flex-1 w-full bg-gray-200 items-center justify-center">
                <Text className="text-4xl">Hello World</Text>
                <View className="py-4">
                    <Button title="Click me"></Button>
                </View>
                <GithubLogin />
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
    )
}