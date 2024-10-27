import { StatusBar } from 'expo-status-bar';
import { NativeWindStyleSheet } from 'nativewind';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PullToRefreshFlatList } from './components/PullToRefreshFlatList';
import { PullToRefreshList } from './components/PullToRefreshList';

NativeWindStyleSheet.setOutput({
    default: "native",
})


export default function App() {

    const flatList = true
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-gray-200 items-center justify-center" >
                <View className="flex-1 w-full bg-gray-200 items-center justify-center">
                    {flatList
                        ? <PullToRefreshFlatList></PullToRefreshFlatList>
                        : <PullToRefreshList></PullToRefreshList>}
                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

