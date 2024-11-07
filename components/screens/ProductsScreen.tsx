import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { ScreenTypes } from "../../App";
import { Product, ProductsResponse } from "../Types";

export function ProductsScreen() {
    const PAGESIZE = 3
    const [products, setProducts] = useState<Product[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [trigger, setTrigger] = useState(false)
    useEffect(() => {
        /* lade die produkte und setze den State */
        const loader = async () => {
            const response = await fetch("https://dummyjson.com/products"
                + "?limit=" + encodeURIComponent(PAGESIZE)
                + "&skip=" + encodeURIComponent(PAGESIZE * (page - 1))
            )
            const data = await response.json() as ProductsResponse
            setProducts(data.products)
            setTotal(data.total)
        }
        loader()
    }, [ page, trigger ])
    const pageCount = Math.ceil(total / PAGESIZE)
    return (
        <View className="flex-1 flex flex-col">
            <View className="flex flex-row justify-center p-2 gap-4">
                <Pressable onPress={() => setPage(page - 1)}>   
                    <Text>Prev</Text>
                </Pressable>
                <Text>Seite: {page} von {pageCount}</Text>
                <Pressable onPress={() => setPage(page + 1)}>
                    <Text>Next</Text>
                </Pressable>
            </View>
            <FlatList className="flex-1"
                data={products}
                keyExtractor={(product) => product.id.toString()}
                renderItem={(info) => (<ProductsItem product={info.item} />) }
            ></FlatList>
        </View>
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

