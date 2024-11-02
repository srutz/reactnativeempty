import * as Animatable from 'react-native-animatable';
import { useState } from 'react';
import { Alert, Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeContainer } from './components/SafeContainer';

/* tyoe of Joke */
type Joke = {
    id: string
    joke: string
}

/* load a random joke from the API */
async function fetchJoke(): Promise<Joke> {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json',
        }
    })
    const data = await response.json()
    return data as Joke
}

export default function App() {
    const [jokes, setJokes] = useState<Joke[]>([])

    const handleButton = () => {
        (async () => {
            const ATTEMPTS = 5
            for (let i = 0; i < ATTEMPTS; i++) {
                const joke = await fetchJoke()
                const existingJoke = jokes.find(j => j.id === joke.id)
                if (!existingJoke) {
                    setJokes([joke, ...jokes])
                    break
                }
            }
        })()
    }

    return (
        <SafeContainer customClasses="bg-gray-200 items-center justify-center flex items-stretch">
            <View className="py-4 self-center">
                <Button onPress={handleButton} title="Load a joke"></Button>
            </View>
            <ScrollView className="flex-1 w-full p-4 flex flex-col">
                {
                    jokes.map((joke, index) => (
                        <Animatable.View
                                animation={(jokes.length - index) % 2 === 0 ? 'bounceInLeft' : 'bounceInRight'}
                                key={joke.id} 
                                className="self-stretch p-4 bg-white rounded-lg shadow-lg mb-4">
                            <Text>{joke.joke}</Text>
                        </Animatable.View>))
                }
            </ScrollView>
        </SafeContainer>
    )
}

