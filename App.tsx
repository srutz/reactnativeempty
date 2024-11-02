import { StatusBar } from 'expo-status-bar';
import { Alert, Button, SafeAreaView, Text, View } from 'react-native';

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
        <SafeAreaView className="flex-1 bg-gray-200 items-center justify-center">
            <View className="bg-red-500"><Text>Red</Text></View>
            <View className="bg-green-500"><Text>Green</Text></View>
            <View className="bg-blue-500"><Text>Blue</Text></View>
            <View className="bg-yellow-500"><Text>Yellow</Text></View>
            <View className="bg-pink-500"><Text>Pink</Text></View>
        </SafeAreaView>
    )
}

