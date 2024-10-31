
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';

type Quote = { quote: string, author: string, id: number }
type QuotesResponse = { quotes: Quote[], skip: number, limit: number }

export function Quotes() {
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const refresh = useCallback(() => {
        (async () => {
            const response = await fetch('https://dummyjson.com/quotes')
            const json = await response.json() as QuotesResponse
            setQuotes(json.quotes)
        })() /* IFEE */
    }, [])
    useEffect(() => {
        refresh()
    }, [])
    return (
        <ScrollView className="flex-1"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                    colors={['#2196F3']} // Android
                    tintColor="#2196F3" // iOS
                />}>
            { quotes.map(quote => <Text className="p-4" key={quote.id}>{quote.quote}</Text>) }
        </ScrollView >
    )
}
