import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { Product, ProductsResponse } from "../Types";

export function ProductsScreen() {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        const loader = async () => {
            const response = await fetch("https://dummyjson.com/products?limit=" + encodeURIComponent(250))
            const data = await response.json() as ProductsResponse
            setProducts(data.products)
        }
        loader()
    }, [])
    return (
        <FlatList data={products}
            keyExtractor={(product) => product.id.toString()}
            renderItem={(info) => (<ProductsItem product={info.item}></ProductsItem>) }
        ></FlatList>
    )
}

/* Rendert das übergebene Product */
function ProductsItem({ product } : { product: Product}) {
    return (
        <View className="flex flex-row p-2 m-3 bg-white rounded-xl border border-gray-300 shadow shadow-black">
            <View className="mr-4 flex justify-center border-r border-gray-300">
                <Image className="w-20 h-20" source={ { uri: product.thumbnail } }></Image>
            </View>
            <View className="flex-1 flex flex-col pb-2">
                <Text className="text-lg">{product.title}</Text>
                <Text className="text-gray-700">{product.description}</Text>
            </View>
        </View>
    )
}

