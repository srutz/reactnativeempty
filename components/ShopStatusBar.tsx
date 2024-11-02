import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useCartContext } from '../hooks/CardContext';

type ShopStatusBarProps = {
    title: string;
}

export function ShopStatusBar({ title}: ShopStatusBarProps) {
    const cart = useCartContext()
    const navigation = useNavigation<any>()

    const statusBarHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0
    const handleHome = () => {
        navigation.navigate("Home")
    }
    const count = cart.getItemCount()

    return (
        <View
            className="w-full bg-white border-b border-gray-200 items-center justify-between px-4"
            style={{ height: statusBarHeight ? statusBarHeight : 50 }}
        >
            <StatusBar style="dark" />
            <View className="h-[50px] w-full flex-row items-center justify-between px-2 mt-auto">
                <View className="flex flex-row items-baseline">
                    <TouchableOpacity onPress={handleHome}>
                        <Text className="text-lg font-bold mr-4">Bestshop</Text>
                    </TouchableOpacity>
                    <Text className="text-sm text-gray-700">{title}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("ManageCart")}>
                    <View className="relative p-2">
                        <MaterialIcons name="shopping-cart" size={32}  />
                        {count > 0 && (
                            <View className="absolute -right-1 bg-red-500 rounded-full min-w-[20px] h-[20px] flex items-center justify-center">
                                <Text className="text-white text-xs font-bold px-1">
                                    {count > 99 ? '99+' : count}
                                </Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
