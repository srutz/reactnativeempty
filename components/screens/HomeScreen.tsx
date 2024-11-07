import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { ScreenTypes } from "../../App";

export function HomeScreen() {
    const nav = useNavigation<NavigationProp<ScreenTypes>>();
    const handleButton = () => {
        nav.navigate("Products")
    }
    return (
        <View className="flex-1 flex flex-col bg-green-400 justify-center items-center">
            <Text>Home Screen</Text>
            <Button title="Go to products" onPress={handleButton}></Button>
        </View>
    )
}
