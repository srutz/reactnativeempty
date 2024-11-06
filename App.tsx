import { StatusBar } from 'expo-status-bar';
import { Alert, Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import { SafeContainer } from './components/SafeContainer';
import { useEffect, useState } from 'react';


function compareArrays(a: any[], b: any[]) {
    if (a.length != b.length)
        return false
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false
    }
    return true
}

type FormType = {
    firstname: string,
    lastname: string,
    email: string,
    city: string,
}
export default function App() {
    const handleButton = () => {
       //form.firstname = "Frank"
       const newForm = {...form}
       newForm.firstname = "Gisela"
       setForm(newForm)
    }
    /* Ein State für alle Formular-Felder */
    const [form, setForm] = useState<FormType>({
        firstname: "",
        lastname: "",
        email: "",
        city: "",
    })
    useEffect(() => {
        /* das ganze formular im aktuellen zustand hier validieren */
        console.log("form changed: " + JSON.stringify(form))
        let m = ""
        if (form.firstname.length < 3 || form.lastname.length < 3) {
            m = "Vorname oder Nachname zu kurz"
        } 
        if (form.email.indexOf("@") == -1) {
            m = "Email ungültig"
        }
        setMessage(m)
    }, [ form ])  // listen for all form changes
    const [message,setMessage] = useState("")
    return (
        <SafeContainer>
            <View className="flex-1 w-full bg-gray-200 items-center justify-start">
                <Text className="text-4xl">Hello World</Text>
                <TextInput className="w-64 px-2 py-1 border border-gray-700 rounded"
                    placeholder='Vorname' autoComplete='given-name'
                    value={form.firstname}
                    onChangeText={(e) => setForm({ ...form, firstname: e})}
                    ></TextInput>
                <TextInput className="w-64 px-2 py-1 border border-gray-700 rounded mt-4"
                    placeholder='Nachname' autoComplete='family-name'
                    value={form.lastname}
                    onChangeText={(e) => setForm({ ...form, lastname: e})}
                    ></TextInput>
                <TextInput className="w-64 px-2 py-1 border border-gray-700 rounded mt-4"
                    placeholder='Stadt' 
                    value={form.city}
                    onChangeText={(e) => setForm({ ...form, city: e})}
                    ></TextInput>
                <TextInput className="w-64 px-2 py-1 border border-gray-700 rounded mt-4"
                    placeholder='EMail' autoComplete='email' autoCapitalize="none"
                    value={form.email}                    
                    onChangeText={(e) => setForm({ ...form, email: e})}
                    ></TextInput>
                <Text className="text-sm text-red-700">{message}</Text>
                <View className="py-4">
                    <Button onPress={handleButton} title="Click me"></Button>
                </View>
                <StatusBar style="auto" />
            </View>
        </SafeContainer>
    )
}

