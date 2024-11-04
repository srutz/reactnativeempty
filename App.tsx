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
        <SafeAreaView className="flex-1 bg-gray-500 flex flex-col items-center justify-center">
            <Sprichwort sprichwort='Der frühe Vogel fängt den Wurm'></Sprichwort>
            <Sprichwort sprichwort='Wer billig kauft der kauft zweimal'></Sprichwort>
        </SafeAreaView>
    )
}

function Sprichwort(props: { sprichwort: string}) {
    const words = props.sprichwort.split(" ")
    const [phase,setPhase] = useState(false)

    console.log("re-render")
    return (
        <View className="bg-white p-8 rounded-lg flex flex-col items-center mb-4">
            {words.map( (word,index) => (
                <Animatable.Text 
                    animation={phase ? "bounceInLeft" : "bounceOutRight" }
                    duration={350}
                    delay={100 + (index * 100)}
                    key={index + (phase ? 100 : 0)} className="text-2xl uppercase">
                        {word}</Animatable.Text>) 
                )
            }
            <View className="mt-8">
                <Button title="Toggle" onPress={() => setPhase(!phase)}></Button>
            </View>
        </View>
    )
}





type TitleViewProps = {
    title: string,
    children?: ReactNode,
} & ViewProps

function TitleView( { title,children } : TitleViewProps) {
    const [open, setOpen] = useState(true)
    console.log("rendering TitleView, open=", open)

    // call webservice um daten zu laden
    return (
        <View className="w-100 self-start p-4 rounded-lg flex flex-col gap-2 bg-white m-4 overflow-hidden">
            <View>
                <TouchableOpacity onPress={() => setOpen(!open)}>
                    <Text className="text-xl font-semibold">{title}</Text>
                </TouchableOpacity>
            </View>
            {open && children}
        </View>
    )
}

