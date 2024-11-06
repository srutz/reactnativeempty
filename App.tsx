import { FlatList, SectionList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeContainer } from './components/SafeContainer';
import { quotes } from "./components/quotes"
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import * as ScreenOrientation from 'expo-screen-orientation'


function copyArray<T>(a: T[]) {
    return [...a]
}
type Quote = {
    id: number,
    quote: string,
    author: string,
}

type Section = {
    title: string,
    data: Quote[]
}

export default function App() {

    useEffect(() => {
        ScreenOrientation.unlockAsync()
    }, [])


    const qs = [...quotes]

    /* array von sections
     * section: title, data[] */

    /* build a map of quotes per author */
    const authorquotes = new Map<string,Quote[]>()
    for (const q of qs) {
        let quotes = authorquotes.get(q.author)
        if (!quotes) {
            quotes = []
            authorquotes.set(q.author, quotes)
        }
        if (quotes.length < 5)
            quotes.push(q)
    }

    const sections: Section[] = []
    for (const author of authorquotes.keys()) {
        sections.push({
            title: author,
            data: authorquotes.get(author) ?? []
        })
    }
    const isHermes = () => !!(global as any).HermesInternal;
    console.log("isHermes", isHermes())
    return (
        <SafeContainer>
            <SectionList
                className="bg-gray-200"
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(info) => (
                    <View className="mx-4 mt-2 p-4 bg-white rounded-lg">
                        <Text selectable>{info.item.quote}</Text>
                        <Text className="self-end text-xs mt-2 text-gray-600">
                            {info.item.author}
                        </Text>
                    </View>
                )}
                renderSectionHeader={ (info) => (
                    <View className="mt-6 flex flex-row justify-end pr-4">
                        <Text className="font-bold text-lg">{info.section.title}</Text>
                    </View>
                )}
            />
            <StatusBar></StatusBar>
        </SafeContainer>
    )
}

