import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeContainer } from './components/SafeContainer';
import { HomeScreen } from './components/screens/HomeScreen';
import { ProductDetails } from './components/screens/ProductDetails';
import { ProductsScreen } from './components/screens/ProductsScreen';
import { Product } from './components/Types';

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
    return (
        <SafeContainer>
            <StatusBar></StatusBar>
            <GestureHandlerRootView>
                <NavigationContainer>
                    <Stack.Navigator >
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Products" component={ProductsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView>
        </SafeContainer>
    )
}

