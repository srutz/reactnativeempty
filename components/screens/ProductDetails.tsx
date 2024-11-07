import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text } from "react-native";
import { ScreenTypes } from "../../App";

export function ProductDetails() {
    /* benutze route um an das übergebene Produkt zu gelangen */
    const route = useRoute<RouteProp<ScreenTypes, "ProductDetails">>()
    const product = route.params.product
    return (
        <ScrollView className="flex-1 bg-red-300">
            <Text className="text-4xl">Details {product.title}</Text>
        </ScrollView> 
    )
}