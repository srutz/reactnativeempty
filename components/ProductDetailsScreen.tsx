import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useRoute } from "@react-navigation/native";
import { Button, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../App";
import { useCartContext } from '../hooks/CardContext';
import { formatPriceGerman } from "../hooks/Util";
import { RatingStars } from './RatingStars';
import { ShopStatusBar } from './ShopStatusBar';

type RouteProps = RouteProp<RootStackParamList, "ProductDetails">;

export function ProductDetailsScreen() {
    const route = useRoute<RouteProps>()
    const product = route.params.product
    const percentageText = product.discountPercentage ? `-${Math.round(product.discountPercentage)}%` : ""

    const cartContext = useCartContext()
    const handleAdd = () => {
        cartContext.addToCart(product)
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 w-full">
                <View className="flex-1 bg-gray-100">
                    <ShopStatusBar
                        title={product.title}
                    />

                    <ScrollView>
                        <View className="items-center shadow-lg shadow-black rounded-lg bg-white p-4 mb-4 mt-4 ml-3 mr-3">
                            {product.images.length > 1
                                ? (
                                    <ScrollView horizontal>
                                        {
                                            product.images.map((image, index) => (
                                                <View key={index} className="w-screen items-center justify-center p-4">
                                                    <Image source={{ uri: image }} className="w-60 h-60" />
                                                </View>
                                            ))
                                        }
                                    </ScrollView>
                                )
                                : (
                                    <View className="w-screen items-center justify-center p-4">
                                        <Image source={{ uri: product.images[0] }} className="w-60 h-60" />
                                    </View>
                                )}


                            <View className="flex-row self-stretch justify-between items-center">

                                <View className="pl-4">
                                    <Text className="text text-gray-700 text-3xl font-bold">€ {formatPriceGerman(product.price)}</Text>
                                </View>

                                {product.discountPercentage >= 1 && (
                                    <View className="flex flex-col">
                                        <View className="ml-4 relative">
                                            <MaterialIcons name="circle" size={80} color="#333333" />
                                            <View className="w-20 h-20 absolute flex items-center justify-center">
                                                <Text className="font-bold text-xl text-white">{percentageText}</Text>
                                            </View>
                                        </View>
                                        <Text className="font-bold">Preissenkung</Text>
                                    </View>
                                )}

                            </View>
                            <View className="flex flex-col ml-4 mt-4">
                                <Text className="text-xl text-red-800 font-bold">{product.title}</Text>
                                <Text className="text-lg text-sm text-gray-500">{product.description}</Text>
                                <View className="w-full flex flex-row justify-between mt-2 items-center">
                                    <Text className="text text-gray-700">Kategorie: <Text className="uppercase">{product.category}</Text></Text>
                                    <Text className="text text-gray-700">Preis: {formatPriceGerman(product.price)}</Text>
                                </View>
                            </View>
                            <View className="flex-row self-stretch mt-4 justify-between">
                                <View className="flex flex-col ml-4">
                                    <Text className="text-xs text-gray-500 mt-2">Noch {product.stock} verfügbar</Text>
                                    <Text className="text-xs text-gray-500 mt-1">{product.shippingInformation}</Text>
                                    <Text className="text-xs text-gray-500 mt-1">{product.returnPolicy}</Text>
                                    <Text className="text-xs text-gray-500 mt-1">{product.warrantyInformation}</Text>
                                </View>
                                <View className="flex flex-col ml-4">
                                    <View className="items-end">
                                        <Text className="text-xs text-gray-500">Bewertung</Text>
                                        <RatingStars stars={Math.round(product.rating)} maxStars={5} />
                                    </View>
                                </View>
                            </View>
                            <View className="self-stretch mt-4 ">
                                <Button onPress={handleAdd} title="In den Warenkorb"></Button>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}