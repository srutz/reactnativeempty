import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from './components/screens/HomeScreen';
import { ProductDetails } from './components/screens/ProductDetails';
import { ProductsScreen } from './components/screens/ProductsScreen';
import { Product } from './components/Types';
import { useDimension } from './hooks/useDimension';

const Stack = createNativeStackNavigator()

export type ScreenTypes = {
    Home: undefined,
    Products: undefined,
    ProductDetails: { product: Product }
}


export default function App() {
    useEffect(() => {
        ScreenOrientation.unlockAsync()
    }, [])
    useDimension()
    return (
        <GestureHandlerRootView>
            <NavigationContainer>
                <Stack.Navigator >
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Products" component={ProductsScreen} />
                    <Stack.Screen name="ProductDetails" component={ProductDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}

