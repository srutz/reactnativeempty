import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
    return (
        <NavigationContainer>
            <Stack.Navigator >
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

