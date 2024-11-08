import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { ScreenTypes } from "../../App";
import { useDimension } from "../../hooks/useDimension";
import { orientationToString, useScreenOrientation } from "../../hooks/useScreenOrientation";


export function HomeScreen() {
    const nav = useNavigation<NavigationProp<ScreenTypes>>();
    const dimension = useDimension()  // wir bekommen die aktuelle Größe und sind reaktiv
    const orientation = useScreenOrientation() // wir bekommen die orientation und sind reaktiv

    const handleButton = () => {
        nav.navigate("Products")
    }

    return (
        <View className="flex-1 flex flex-col bg-green-400 justify-center items-center">
            <Text>{orientationToString(orientation)}</Text>
            <Text>Dim {JSON.stringify(dimension, null, 4)}</Text>
            <Button title="Go to products" onPress={handleButton}></Button>
        </View>
    )
}
