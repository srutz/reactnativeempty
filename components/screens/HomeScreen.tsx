import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { ScreenTypes } from "../../App";
import { useDimension } from "../../hooks/useDimension";

export function HomeScreen() {
    const nav = useNavigation<NavigationProp<ScreenTypes>>();
    const handleButton = () => {
        nav.navigate("Products")
    }
    const dimension = useDimension()  // wir bekommen die aktuelle Größe und sind reaktiv
    return (
        <View className="flex-1 flex flex-col bg-green-400 justify-center items-center">
            <Text>Dim {JSON.stringify(dimension, null, 4)}</Text>
            <Text>{dimension.height > 600 ? "Höhe ok" : "Zu niedrig"}</Text>
            <Button title="Go to products" onPress={handleButton}></Button>
        </View>
    )
}
