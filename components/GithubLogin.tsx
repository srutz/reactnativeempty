import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { config } from '../env';


WebBrowser.maybeCompleteAuthSession()

const CLIENT_ID = "6f14e54bc85e4a5b2d17"

console.log("CLIENT_ID", CLIENT_ID)
console.log("CLIENT_SECRET", config.githubSecret)


// Endpoint
const discovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint: "https://github.com/settings/connections/applications/" + CLIENT_ID,
};

export default function GithubLogin() {
    const redirectUri = makeRedirectUri({
        scheme: 'your.app'
    })
    console.log("redirectUri", redirectUri)
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: CLIENT_ID,
            scopes: ['identity'],
            redirectUri,
        },
        discovery
    )

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
        }
    }, [response])

    return (
        <View className="w-full h-60 flex justify-center items-center bg-gray-300">
            <Text>Login with your Github Account</Text>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    )
}
