import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { ScreenTypes } from "../../App";
import { Product, ProductsResponse } from "../Types";

export function ProductsScreen() {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        /* lade die produkte und setze den State */
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
            renderItem={(info) => (<ProductsItem product={info.item} />) }
        ></FlatList>
    )
}

/* Rendert das übergebene Product */
function ProductsItem({ product } : { product: Product}) {
    const nav = useNavigation<NavigationProp<ScreenTypes>>()
    const handleButton = () => {
        nav.navigate("ProductDetails", { product: product })
    }
    return (
        <View className="flex flex-row p-2 m-3 bg-white rounded-xl border border-gray-300 shadow shadow-black">
            <View className="mr-4 flex justify-center border-r border-gray-300">
                <Image className="w-20 h-20" source={ { uri: product.thumbnail } }></Image>
            </View>
            <View className="flex-1 flex flex-col pb-2">
                <Text className="text-lg">{product.title}</Text>
                <Text className="text-gray-700">{product.description}</Text>
                <View className="self-end mt-2">
                    <MyButton title="Show more" onPress={handleButton}></MyButton>
                </View>
            </View>
        </View>
    )
}

/* Eigener Button */
function MyButton({ title, onPress }: { title: string, onPress: () => void}) {
    return (
        <Pressable onPress={onPress}>
            <View className="bg-blue-700 px-2 py-1 rounded m-1">
                <Text className="uppercase text-sm text-white tracking-tight font-semibold">{title}</Text>
            </View>
        </Pressable>
    )
}

