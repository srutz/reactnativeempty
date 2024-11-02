import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import { useEffect, useRef } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ShopLogo } from "./ShopLogo";
import { ShopStatusBar } from "./ShopStatusBar";
import { SafeContainer } from "./SafeContainer";

const video1 = require('../assets/videos/854100-hd_1920_1080_25fps.mp4');

export function HomeScreen() {
    const navigation = useNavigation<any>()
    const video = useRef<Video>(null)
    useEffect(() => {
        if (Platform.OS !== 'web') {
            video.current?.playAsync()
        }
    }, [video])
    const handleOnLoad = () => {
        if (Platform.OS !== 'web') {
            video.current?.playAsync()
        }
    }
    const handleVideoPress = () => {
        video.current?.playAsync()
        navigation.navigate('Products')
    }

    return (
        <SafeContainer>
            <View className="flex-1 bg-gray-100">
                <ShopStatusBar
                    title="Home"
                />
                <ScrollView className="flex-1 w-full">
                    <TouchableOpacity onPress={() => navigation.navigate('Products')}>
                        <View className="flex flex-col items-center justify-center px-4 py-2">
                            <ShopLogo></ShopLogo>
                            <Text className="text-lg font-bold p-4">Alle Produkte anzeigen</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleVideoPress}>
                        <View className="relative flex-1">
                            <Video ref={video}
                                source={video1}
                                isLooping={true}
                                onLoad={handleOnLoad}
                                className="w-full h-[400] aspect-video"
                                resizeMode={ResizeMode.CONTAIN}>
                            </Video>
                            <Text className="absolute bottom-[90] left-0 ml-4 p-2 text-3xl font-bold text-white uppercase">Nur jetzt unsere Sommerangebote</Text>
                            <Text className="absolute bottom-[56] left-0 ml-4 p-2 text-white">Schuhe, Laptops, Parfüms, Süssigkeiten</Text>
                            <View className="absolute bottom-[14] bg-white rounded-xl ml-5 p-2"><Text className="font-bold">Jetzt entdecken</Text></View>
                        </View>
                    </TouchableOpacity>
                    <View className="flex-1 grow items-center justify-center px-4 py-2 bg-blue-200">
                        <Text className="text-sm ">Risikolos einkaufen, kostenlose Retouren.</Text>
                        <Text className="text-sm ">&copy; Bestshop Company (Dies ist nur eine Demo).</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeContainer>
    )
}