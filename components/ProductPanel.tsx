import { Image, Text, View } from "react-native";
import { formatPriceGerman } from "../hooks/Util";
import { RatingStars } from "./RatingStars";
import { Product } from "./Types";

export function ProductPanel( { product }: { product: Product } ) {
    return (
        <View className="items-center shadow-lg shadow-black rounded-lg bg-white p-4 mb-4 mt-4 ml-3 mr-3">
            <View className="flex-row self-stretch">
                <Image source={{ uri: product.thumbnail }} className="w-24 h-24" />
                <View className="grow"></View>
                <View className="items-end">
                    <Text className="text-xs text-gray-500">Bewertung</Text>
                    <RatingStars stars={Math.round(product.rating)} maxStars={5} />
                    <Text className="text-xs text-gray-500 mt-2">Noch {product.stock} verfügbar</Text>
                </View>
            </View>
            <View className="flex flex-col ml-4">
                <Text className="text-xl text-red-800 font-bold">{product.title}</Text>
                <Text className="text-lg text-sm text-gray-500">{product.description}</Text>
                <View className="w-full flex flex-row justify-between mt-2">
                    <Text className="text text-gray-700">Kategorie: <Text className="uppercase">{product.category}</Text></Text>
                    <Text className="text text-gray-700">Preis: {formatPriceGerman(product.price)}</Text>
                </View>
            </View>
        </View>
    )
}