import * as Animatable from 'react-native-animatable';
import { Button, FlatList, Image, Text, View } from 'react-native';
import { SafeContainer } from './components/SafeContainer';
import { ComponentProps, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// this list is created on the shell using curl and jq with 
// curl https://dummyjson.com/products | jq "[.products[].thumbnail]"
const urls = [
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Cucumber/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Eggs/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Juice/thumbnail.png",
    "https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png"
]


const zoomIn: Animatable.CustomAnimation = {
    0: {
        scaleX: 0.75,
        scaleY: 0.75,
    },
    1: {
        scaleX: 1,
        scaleY: 1,
    },
}

const zoomOut: Animatable.CustomAnimation = {
    0: {
        scaleX: 1,
        scaleY: 1,
    },
    1: {
        scaleX: 0.75,
        scaleY: 0.75,
    },
}



function ImagePanel({ source, title }: { source: string, title: string }) {
    return (
        <View className="bg-black p-4 rounded-lg shadow-lg w-64 h-64 overflow-hidden ">
            <Text className="text-white font-semibold">{title}</Text>
            <Image source={{ uri: source }} className="w-full h-full" />
        </View>
    )
}


export default function App() {


    const [activeItems, setActiveItems] = useState<string[]>([])
    type ViewableItemsChangedInfo = Parameters<NonNullable<ComponentProps<typeof FlatList>['onViewableItemsChanged']>>[0]
    const viewableItemsChanged = (info: ViewableItemsChangedInfo) => {
        if (info.viewableItems.length > 0) {
            setActiveItems(info.viewableItems.map(item => item.key))
        }
    }
    const [horizontal, setHorizontal] = useState(false)

    return (
        <SafeContainer customClasses="bg-gray-600 flex flex-col items-stretch">
            <View className="flex flex-row items-center justify-center p-4">
                <Button title="Toggle" onPress={() => setHorizontal(!horizontal)}></Button>
            </View>
            <FlatList
                horizontal={horizontal}
                className="flex-1 grow w-full px-4 "
                data={urls}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Animatable.View
                        duration={250}
                        easing={"ease-in-out"}
                        animation={activeItems.indexOf(index.toString()) != -1 ? zoomIn: zoomOut}
                        key={index}
                        className="self-stretch p-4 flex flex-col items-center justify-center">
                        <ImagePanel source={item} title={"Image " + (index + 1)} />
                    </Animatable.View>)}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 60,
                }}

            ></FlatList>
            <StatusBar />
        </SafeContainer>
    )
}

