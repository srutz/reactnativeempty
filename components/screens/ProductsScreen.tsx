import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, Pressable, RefreshControl, Text, View } from "react-native";
import { ScreenTypes } from "../../App";
import { Product, ProductsResponse } from "../Types";

async function delay(millis: number) { return new Promise(resolve => setTimeout(resolve, millis)) }

export function ProductsScreen() {
    const PAGESIZE = 100
    const [products, setProducts] = useState<Product[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [trigger, setTrigger] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        /* lade die produkte und setze den State */
        const loader = async () => {
            setRefreshing(true)
            try {
                const url = "https://dummyjson.com/products"
                    + "?limit=" + encodeURIComponent(PAGESIZE)
                    + "&skip=" + encodeURIComponent(PAGESIZE * (page - 1))
                const response = await fetch(url)
                const data = await response.json() as ProductsResponse
                //await delay(5_000)
                console.log("loaded " + url)
                setProducts(data.products)
                setTotal(data.total)
            } finally {
                setRefreshing(false)
            }
        }
        loader()
    }, [page, trigger])
    const pageCount = Math.ceil(total / PAGESIZE)

    const flatList = useRef<FlatList<Product>>(null)
    const move = (n: number) => {
        if (page + n < 1 || page + n > pageCount) {
            return
        }
        setPage(page + n)
        flatList.current?.scrollToIndex({ index: 0, animated: true })
    }
    return (
        <View className="flex-1 flex flex-col">
            <FlatList className="flex-1"
                ref={flatList}
                data={products}
                keyExtractor={(product) => product.id.toString()}
                renderItem={(info) => (<ProductsItem product={info.item} />)}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    title="Pull to refresh"
                    onRefresh={() => { setPage(1); setTrigger(!trigger) }}
                >
                </RefreshControl>}
                ListFooterComponent={(undefined)}
            ></FlatList>
            {pageCount > 1 &&
                <View className="flex flex-row justify-center p-2 gap-4 items-center">
                    <Pressable onPress={() => move(-1)}>
                        <MaterialIcons name="arrow-back" size={24} />
                    </Pressable>
                    <Text className="text-xl">Seite: {page} von {pageCount}</Text>
                    <Pressable onPress={() => move(1)}>
                        <MaterialIcons name="arrow-forward" size={24} />
                    </Pressable>
                </View>
            }
        </View>
    )
}

/* Rendert das übergebene Product */
function ProductsItem({ product }: { product: Product }) {
    const nav = useNavigation<NavigationProp<ScreenTypes>>()
    const handleButton = () => {
        nav.navigate("ProductDetails", { product: product })
    }
    return (
        <View className="flex flex-row p-2 m-3 bg-white rounded-xl border border-gray-300 shadow shadow-black">
            <View className="mr-4 flex justify-center border-r border-gray-300">
                <Image className="w-20 h-20" source={{ uri: product.thumbnail }}></Image>
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
function MyButton({ title, onPress }: { title: string, onPress: () => void }) {
    return (
        <Pressable onPress={onPress}>
            <View className="bg-blue-700 px-2 py-1 rounded m-1">
                <Text className="uppercase text-sm text-white tracking-tight font-semibold">{title}</Text>
            </View>
        </Pressable>
    )
}

