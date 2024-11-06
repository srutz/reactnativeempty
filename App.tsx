import { StatusBar } from 'expo-status-bar';
import { Alert, Button, SafeAreaView, Text, View } from 'react-native';
import { SafeContainer } from './components/SafeContainer';
import { useEffect, useState } from 'react';
import { useCounter } from './hooks/useCounter';


export default function App() {
    useCounter(750)
    const handleButton = () => {
    }
    console.log("---rendering App " + new Date().toLocaleString())
    return (
        <SafeContainer>
            <View className="flex-1 w-full bg-gray-200 items-center justify-start">
                <Text className="text-4xl">Hello World {new Date().toLocaleString()}</Text>
                <View className="py-4">
                    <Button onPress={handleButton} title="Click me"></Button>
                </View>
                <StatusBar style="auto" />
            </View>
        </SafeContainer>
    )
}

