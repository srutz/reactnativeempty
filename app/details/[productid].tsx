import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { FlatList } from "react-native-gesture-handler";
import { ImagePanel } from "../../components/ImagePanel";
import { Product } from "../../components/Types";

export default function ProductDetails() {
    const [product, setProduct] = useState<Product>()

    // productid aus den Search Params extrahieren
    const { productid } = useLocalSearchParams<{ productid: string }>()

    useEffect(() => {
        (async () => {
            const r = await fetch("https://dummyjson.com/products/" + encodeURIComponent(productid))
            const d = await r.json() as Product
            setProduct(d)
        })()
    }, [])

    if (!product) {
        return (
            <Text></Text>
        )
    }

    return (
        <ScrollView className="flex-1">
            <View className="flex flex-col p-2 m-3 bg-white rounded-xl border border-gray-300 shadow shadow-black">
                <View className="flex-1 flex flex-col pb-2">
                    <Text className="text-lg">{product.title}</Text>
                </View>
                <View className="mr-4 flex justify-stretch">
                    {product.images.length > 1
                    ? (
                        <FlatList
                            horizontal
                            className="flex-1 grow w-full px-4 "
                            data={product.images}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <Animatable.View
                                    duration={250}
                                    easing={"ease-in-out"}
                                    //animation={activeItems.indexOf(index.toString()) != -1 ? zoomIn : zoomOut}
                                    key={index}
                                    className="self-stretch p-4 flex flex-col items-center justify-center">
                                    <ImagePanel source={item} title={"Image " + (index + 1)} />
                                </Animatable.View>)}
                            //onViewableItemsChanged={viewableItemsChanged}
                            viewabilityConfig={{
                                itemVisiblePercentThreshold: 60,
                            }}

                        ></FlatList>
                    ):(
                        <Animatable.View
                            duration={250}
                            easing={"ease-in-out"}
                            className="self-stretch p-4 flex flex-col items-center justify-center">
                            <ImagePanel source={product.images[0]} title={"Image 1"} />
                        </Animatable.View>
                    )}
                </View>
                <View className="flex-1 flex flex-col pb-2">
                    <Text className="text-gray-700">{product.description}</Text>
                </View>
                <View className="flex flex-row justify-between">
                    <Text>Verfügbar: {product.stock}</Text>
                    <Text>SKU: {product.sku}</Text>
                </View>
                <View className="flex flex-row justify-between">
                    <Text>Höhe: {product.dimensions.height} m</Text>
                    <Text>Breite: {product.dimensions.width} m</Text>
                    <Text>Tiefe: {product.dimensions.depth} m</Text>
                </View>
            </View>
        </ScrollView>
    )
}

