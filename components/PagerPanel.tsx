import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from "react-native";

type PagerPanelProps = {
    pageCount: number
    page: number
    setPage: (page: number) => void
}

export function PagerPanel({ page, pageCount, setPage } : PagerPanelProps ) {
    return (
        <View className="flex flex-row p-4 justify-center">
            <TouchableOpacity onPress={() => setPage(page - 1)} disabled={page <= 1}>
            <MaterialIcons name="shopping-bag" size={40} color="#800000" />            </TouchableOpacity>
            <Text>{page} of {pageCount}</Text>
            <TouchableOpacity onPress={() => setPage(page + 1)} disabled={page >= pageCount}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    )
}