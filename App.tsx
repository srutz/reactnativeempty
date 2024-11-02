import { StatusBar } from 'expo-status-bar';
import { Component, ComponentProps, ComponentPropsWithoutRef, ReactNode, useState } from 'react';
import { Alert, Button, SafeAreaView, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function App() {

    const handleButton = () => {
        Alert.alert(
            'Question',
            'Are you sure you want to proceed?',
            [
                {
                    text: 'Yes',
                    onPress: () => console.log('Yes pressed'),
                },
            ],
            { cancelable: false } // kein Tap auf den Hintergrund zum Schließen
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-200 flex flex-col items-center justify-center">
            <TitleView title="Hello World">
                <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </Text>
            </TitleView>
        </SafeAreaView>
    )
}




type TitleViewProps = {
    title: string,
    children?: ReactNode,
} & ViewProps

function TitleView( { title,children } : TitleViewProps) {
    const [open, setOpen] = useState(true)
    return (
        <View 
                className="w-100 self-start p-4 rounded-lg shadow-black shadow-lg flex flex-col gap-2 bg-white m-4 overflow-hidden">
            <View>
                <TouchableOpacity onPress={() => setOpen(!open)}>
                    <Text className="text-xl font-semibold">{title}</Text>
                </TouchableOpacity>
            </View>
            <Animatable.View className="overflow-hidden" animation={open ? 'bounceInLeft' : 'bounceOutDown'}>
                {children}
            </Animatable.View>
        </View>
    )
}

