import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { Alert, Button, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

const product = {
    image: "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png",
    price: 99910.50,
    title: "Sessel",
    description: "Dieser Sessel ist ein super komfortabler Sessel, der Ihnen ein tolles Sitzerlebnis bescheren wird.",
    stockAmount: 6,
    rating: 3,
}
type ProductType = typeof product

/* format number as german money, using intl */
function formatGermanMoney(price: number) {
    return new Intl.NumberFormat('de-DE',
        { style: 'currency', currency: 'EUR' }).format(price)
}



export default function App() {
    /* 3 Views (Hauptview Vertikal + 2x nested horizontal)
       6 Componenten... Bild, Preis, Titel, Beschreibung, Menge und Rating
    */
    return (
        <SafeAreaView className="flex-1 bg-gray-200 items-center justify-center">
            <View className="bg-white p-4 h-[300] w-[85%] rounded-lg">
                <View className="flex flex-row justify-between">
                    <Image className="h-32 w-32" resizeMode="contain" source={{ uri: product.image }} ></Image>
                    <View className="self-end pb-4">
                        <Text className="text-2xl">{formatGermanMoney(product.price)}</Text>
                    </View>
                </View>
                <View className="mb-2"><Text className="font-bold">{product.title}</Text></View>
                <View className="grow mb-2"><Text>{product.description}</Text></View>
                <View className="flex flex-row border-t border-gray-300 pt-2">
                    <View className="">
                        <Text>Lieferbare Anzahl:
                            <Text className="font-bold"> {product.stockAmount}</Text>
                        </Text>
                    </View>
                    <View className="grow"></View>
                    <View className=""><Text>Bewertung: 
                        <Text className="font-bold">{product.rating} von 5</Text>
                    </Text></View>
                </View>
            </View>
        </SafeAreaView>
    )
}

