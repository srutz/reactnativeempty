import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ProductPanel } from "./ProductPanel";
import { ShopStatusBar } from "./ShopStatusBar";
import { Product, ProductsResponse } from "./Types";

const PAGESIZE = 10

export function ProductsScreen() {
    const navigation = useNavigation()

    const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState(1)

    /* fetch products */
    const { isPending, error, data, isFetching, refetch } = useQuery({
        queryKey: ["products", page],
        queryFn: async () => {
            const response = await fetch(
                "https://dummyjson.com/products"
                    + "?limit=" + encodeURIComponent(PAGESIZE)
                    + "&skip=" + encodeURIComponent(PAGESIZE * (page - 1)))
            return await response.json() as ProductsResponse
        },
    })

    /* move response to data */
    useEffect(() => {
        if (data) {
            setProducts((prev) => [...data.products])
        } else {
            setProducts([])
        }
    }, [data])


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
                        <FlatList data={products}
                            keyExtractor={(product) => product.id.toString()}
                            renderItem={({ item: product }) => (<ProductPanel product={product} />)}
                        ></FlatList>
                    )}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}