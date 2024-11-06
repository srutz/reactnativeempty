import { Button, Text, View } from "react-native";
import { SafeContainer } from "./SafeContainer";
import { useNavigation } from "@react-navigation/native";
import { useCartContext } from "../hooks/CardContext";
import { ShopStatusBar } from "./ShopStatusBar";
import { useCountContext } from "../hooks/CounterContext";

export function MyScreen() {
    const nav = useNavigation<any>()
    const handlePress = () => {
        nav.navigate("Products")
    }

    const cartContext = useCartContext()
    const numberItems = cartContext.getItemCount()
    const handleBuy = () => {
        const p = cartContext.items[0].product
        cartContext.addToCart(p)
    }
    if (!cartContext) {
        return undefined
    }

    const countContext = useCountContext()
    const handleCount = () => {
        countContext.setCount(countContext.count + 1)
    }

    console.log("render myscreen")


    return (
        <SafeContainer>
            <ShopStatusBar title="My Screen"></ShopStatusBar>
            <View className="flex-1 items-center">
                <Text>My Screen</Text>
                <Text>Count = {countContext.count}</Text>
                <Text>Items in cart: {numberItems}</Text>
                {
                    cartContext.items.map((item) => (
                        <Text key={item.product.id}>{item.count} {item.product.title}</Text>
                    ))
                }
                <View><Button onPress={handlePress} title="Go to Products"></Button></View>
                <View><Button onPress={handleBuy} title="Buy Stuff"></Button></View>
                <View><Button onPress={handleCount} title="SetCount "></Button></View>
            </View>
        </SafeContainer>
    )
}