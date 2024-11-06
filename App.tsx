import { StatusBar } from 'expo-status-bar';
import { Alert, Button, SafeAreaView, Text, View } from 'react-native';
import { SafeContainer } from './components/SafeContainer';

export default function App() {

    const handleButton = () => {
        Alert.alert(
            'Question',
            'Are you sure you want to proceed?',
            [
                {
                    text: 'Yes',
                    onPress: () => console.log('Yes pressed'),
                },
            ],
            { cancelable: false } // kein Tap auf den Hintergrund zum Schließen
        )
    }

    return (
        <SafeContainer>
            <View className="flex-1 w-full bg-gray-200 items-center justify-start">
                <Text className="text-4xl">Hello World</Text>
                <View className="py-4">
                    <Button onPress={handleButton} title="Click me"></Button>
                </View>
                <StatusBar style="auto" />
            </View>
        </SafeContainer>
    )
}

