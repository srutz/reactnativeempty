
import React, { useCallback, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    Text,
    View
} from 'react-native';

function makeItems(n: number) {
    return Array.from({ length: n }, (_, i) => "Item " + i)
}

async function delay(delayMillis: number) {
    return new Promise((resolve) => setTimeout(resolve, delayMillis))
}

export function PullToRefreshList() {
    const [refreshing, setRefreshing] = useState(false)
    const [items, setItems] = useState(makeItems(200))

    const onRefresh = useCallback(() => {
        (async () => {
            setRefreshing(true)
            try {
                await delay(5_000)
                const newItem = `Item ${items.length + 1}`
                setItems(prevItems => [...prevItems, newItem])
            } finally {
                setRefreshing(false)
            }
        })()
    }, [items])

    return (
        <ScrollView
            className="w-full flex-1 bg-gray-200 pt-4"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#2196F3']} // Android
                    tintColor="#2196F3" // iOS
                />
            }>
            {items.map((item, index) => (
                <View key={index} className="bg-white shadow-lg shadow-black border border-gray-300 p-4 mx-3 my-1 rounded-lg">
                    <Text className="text-gray-600 text-lg">{item}</Text>
                </View>
            ))}
        </ScrollView>
    )
}
