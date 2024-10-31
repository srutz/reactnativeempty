import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from "react-native";

type PagerPanelProps = {
    pageCount: number
    page: number
    setPage: (page: number) => void
}

export function PagerPanel({ page, pageCount, setPage } : PagerPanelProps ) {
    const hasPrevious = page > 1
    const hasNext = page < pageCount
    return (
        <View className="flex flex-row p-4 justify-center items-center">
            <TouchableOpacity onPress={() => setPage(page - 1)} disabled={!hasPrevious}>
                <MaterialIcons name="keyboard-arrow-left" size={40} color={hasPrevious ? "#333333" : "#cccccc"} />
            </TouchableOpacity>
            <Text>Seite {page} von {pageCount}</Text>
            <TouchableOpacity onPress={() => setPage(page + 1)} disabled={!hasNext}>
                <MaterialIcons name="keyboard-arrow-right" size={40} color={hasNext ? "#333333" : "#cccccc"} />
            </TouchableOpacity>
        </View>
    )
}