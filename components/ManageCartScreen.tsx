import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Fragment, useState } from 'react';
import { Button, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from '../App';
import { useCartContext } from '../hooks/CardContext';
import { formatPriceGerman } from "../hooks/Util";
import { LargeNotification } from './LargeNotification';
import { ShopStatusBar } from './ShopStatusBar';


export function ManageCartScreen() {
    const cartContext = useCartContext()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const totalSum = cartContext.items.reduce((acc, item) => acc + item.count * item.product.price, 0)
    const [showNotification, setShowNotification] = useState(false)
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 w-full">
                <View className="flex-1 bg-white">
                    <ShopStatusBar
                        title="Dein Warenkorb"
                    />

                    <ScrollView>
                        {cartContext.items.length === 0 && (
                            <View className="flex-1 items-center justify-center">
                                <Text className="text-lg font-bold mt-4 mb-4">Dein Warenkorb ist leer</Text>
                                <Button title="Zurück zur Produktauswahl" onPress={() => navigation.navigate('Products')}></Button>
                            </View>
                        )}
                        {cartContext.items.map((item, index) => (
                            <Fragment key={index}>
                                <View key={index} className="items-center mb-4 mt-4 ml-3 mr-3">
                                    <View className="flex-row self-stretch ml-4 mb-4 pb-2 border-b border-gray-200 justify-between">
                                        <Text className="text-lg font-bold">{item.product.title}</Text>
                                        <TouchableOpacity onPress={() => cartContext.removeFromCart(item.product)}>
                                            <MaterialIcons name="delete" size={24} color="#666666" />
                                        </TouchableOpacity>
                                    </View>
                                    <View className="flex-row self-stretch">
                                        <Image source={{ uri: item.product.thumbnail }} className="w-24 h-24" />
                                        <View className="w-full flex flex-col mt-2">
                                            <Text className="text text-gray-700">Anzahl: {item.count}</Text>
                                            <Text className="text text-gray-700">Einzelpreis: {formatPriceGerman(item.product.price)}</Text>
                                            <Text className="text-lg mt-2 font-bold text-gray-700">{formatPriceGerman(item.count * item.product.price)}</Text>
                                        </View>
                                    </View>
                                    <View className="flex flex-col ml-4">
                                    </View>
                                </View>
                            </Fragment>
                        ))}
                        {cartContext.items.length > 0 && (
                            <View className="mt-4 mx-8 pt-4 border-t border-gray-200 ">
                                <View className="flex-row justify-between mb-4 items-center">
                                    <Text>Gesamtsumme</Text>
                                    <Text className="font-bold text-lg">{formatPriceGerman(totalSum)}</Text>
                                </View>
                                <Button title="Zur Kasse" onPress={() => setShowNotification(true)}></Button>
                            </View>
                        )}
                        {showNotification && (
                            <LargeNotification 
                                type="error"
                                title="Not implemented" 
                                message="Diese Funktion ist nicht implementiert. Bitte schließen Sie die Benachrichtigung oder kehren Sie zur Produktübersicht zurück." 
                                onClose={() => setShowNotification(false)} >
                            </LargeNotification>
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}