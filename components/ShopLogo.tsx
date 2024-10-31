import { MaterialIcons } from '@expo/vector-icons';
import { Text, View, ViewStyle } from 'react-native';

export function ShopLogo() {
    const style = {
        transform: [{ rotate: '-6deg' }]
    } satisfies ViewStyle

    return (
        <View className="flex flex-row items-center rounded-lg bg-white p-4 mb-4 mt-4" style={style}>
            <MaterialIcons name="shopping-bag" size={40} color="#800000" />
            <Text className="text-5xl text-red-800 ml-4 mt-2 uppercase font-bold">Bestshop</Text>
        </View>
    )

}