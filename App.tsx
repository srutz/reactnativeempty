import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeScreen } from './components/HomeScreen';
import { ManageCartScreen } from './components/ManageCartScreen';
import { ProductDetailsScreen } from './components/ProductDetailsScreen';
import { ProductsScreen } from './components/ProductsScreen';
import { Product } from './components/Types';
import { CartContextProvider } from './hooks/CardContext';
import { MyScreen } from './components/MyScreen';
import { CountContextProvider } from './hooks/CounterContext';

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient()

export type RootStackParamList = {
    Products: undefined,
    ProductDetails: { product: Product },
}


export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CartContextProvider>
                <CountContextProvider>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false // Hide default header since we're using our custom StatusBar
                            }}>
                            <Stack.Screen name="My" component={MyScreen} />
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="Products" component={ProductsScreen} />
                            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                            <Stack.Screen name="ManageCart" component={ManageCartScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </CountContextProvider>
            </CartContextProvider>
        </QueryClientProvider>
    )
}

