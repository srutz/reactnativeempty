import { Image, Text, View } from "react-native";


export function ImagePanel({ source, title, width = "w-64", height="h-64"  }
    : { source: string, title: string, width?: string, height?: string }) {
    return (
        <View className={"flex flex-col bg-black p-4 rounded-lg shadow-lg overflow-hidden " + width + " " + height}>
            <Text className="text-white font-semibold">{title}</Text>
            <Image source={{ uri: source }} className="w-full h-full" />
        </View>
    )
}
