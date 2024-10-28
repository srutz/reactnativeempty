import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ProductPanel } from "./ProductPanel";
import { ShopStatusBar } from "./ShopStatusBar";
import { ProductsResponse } from "./Types";

const PAGESIZE = 10

export function ProductsScreen() {
    const navigation = useNavigation()

    //const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")

    /* fetch products */
    const { isPending, error, data, isFetching, refetch } = useQuery({
        queryKey: ["products", page, searchQuery],
        staleTime: 250,
        placeholderData: { products: [], total: 0, skip: 0, limit: PAGESIZE },
        queryFn: async () => {
            let url = "https://dummyjson.com/products"
            const searchParams = new URLSearchParams()
            if (searchQuery) {
                url += "/search"
                searchParams.set("q", searchQuery)
            }
            searchParams.set("limit", PAGESIZE.toString())
            searchParams.set("skip", (PAGESIZE * (page - 1)).toString())
            if (Array.from(searchParams).length > 0) {
                url += "?" + searchParams.toString()
            }
            const response = await fetch(url)
            return await response.json() as ProductsResponse
        },
    })

    /* move response to data */
    const products = data?.products || []
 
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 w-full">
                <View className="flex-1 bg-gray-100">
                    <ShopStatusBar
                        title="Unsere Produkte"
                    />
                    {isPending
                        ? (<Text>Loading...</Text>)
                        : (
                            <>
                                <TextInput
                                    className="h-10 mx-3 my-3 px-4 border border-gray-300 rounded-lg"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    clearButtonMode="while-editing"
                                />
                                <FlatList data={products}
                                    keyExtractor={(product) => product.id.toString()}
                                    renderItem={({ item: product }) => (<ProductPanel product={product} />)}
                                />
                            </>
                        )}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}