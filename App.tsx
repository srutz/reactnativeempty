import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeContainer } from './components/SafeContainer';
import { quotes } from "./components/quotes"
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';


function copyArray<T>(a: T[]) {
    return [...a]
}
type Quote = {
    id: number,
    quote: string,
    author: string,
}


export default function App() {
    const [author, setAuthor] = useState("")

    let qs = copyArray(quotes)
    if (author.length > 0) {
        qs = qs.filter((q) => q.author == author)
    }

    const handlePress = (item: Quote) => {
        setAuthor(item.author == author ? "" : item.author)
    }
    console.log("rendering with author: " + author)

    return (
        <SafeContainer>
            <View className="h-12 m-4 bg-gray-200 flex flex-row">
                <TextInput className="grow border border-gray-300 px-2" editable={false} placeholder='Autor eingeben'>
                    {author}
                </TextInput>
            </View>
            <FlatList
                className="bg-gray-200"
                data={qs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(info) => (
                    <View className="mx-4 mt-2 p-4 bg-white rounded-lg">
                        <Text>{info.item.quote}</Text>
                        <TouchableOpacity onPress={() => handlePress(info.item)}>
                            <Text className="self-end text-xs mt-2 text-gray-600">
                                {info.item.author}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <StatusBar></StatusBar>
        </SafeContainer>
    )
}

