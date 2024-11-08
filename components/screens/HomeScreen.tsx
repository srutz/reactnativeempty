import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Orientation } from "expo-screen-orientation";
import { Button, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ScreenTypes } from "../../App";
import { useDimension } from "../../hooks/useDimension";
import { useScreenOrientation } from "../../hooks/useScreenOrientation";


import berlinBreit from "../../assets/berlinbreit.jpg";
import berlinHoch from "../../assets/berlinhoch.jpg";

import { MyBottomSheet } from "../MyBottomSheet";




export function HomeScreen() {
    const nav = useNavigation<NavigationProp<ScreenTypes>>()
    const dimension = useDimension()  // wir bekommen die aktuelle Größe und sind reaktiv
    const orientation = useScreenOrientation() // wir bekommen die orientation und sind reaktiv

    const handleButton = () => {
        nav.navigate("Products")
    }

    return (
        <View className="flex-1 flex flex-col justify-center items-center py-4">
            <View className="mt-4 mb-2">
                <Button title="Go to products" onPress={handleButton}></Button>
            </View>
            <View className="w-full h-1 grow flex flex-col overflow-hidden relative">
                {orientation == Orientation.LANDSCAPE_LEFT || orientation == Orientation.LANDSCAPE_RIGHT
                    ? <Animatable.Image
                        animation="bounceInDown"
                        className="w-full flex-1" resizeMode="cover" source={berlinBreit} />
                    : <Animatable.Image
                        animation="bounceInUp"
                        className="w-full flex-1" resizeMode="cover" source={berlinHoch} />
                }
                <View className="bg-black opacity-50 absolute p-8 top-[40%] w-full">
                    <Text className="uppercase text-4xl text-white text-center">Hello Berlin</Text>
                </View>
                <View className="absolute p-8 top-[40%] w-full">
                    <Text className="uppercase text-4xl text-white text-center">Hello Berlin</Text>
                </View>
            </View>
            <MyBottomSheet height={32}>
                <View className="mt-4 mb-2 self-center">
                    <Button title="Impressum" onPress={handleButton}></Button>
                </View>
                <View className="mt-4 mb-2 self-center">
                    <Button title="Kontakt" onPress={handleButton}></Button>
                </View>
            </MyBottomSheet>
        </View>
    )
}
