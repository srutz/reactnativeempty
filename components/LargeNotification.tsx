
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    Text,
    TouchableOpacity,
    View
} from 'react-native';



interface LargeNotificationProps {
    title: string
    message: string
    type?: | 'success' | 'error' | 'warning' | 'info'
    duration?: number
    onPress?: () => void
    onClose?: () => void
}

const NOTIFICATION_COLORS = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500',
    info: 'bg-blue-500'
}

export function LargeNotification({
    title = "Notification Title",
    message = "This is a notification message",
    type = "success",
    duration = 5000,
    onPress,
    onClose,
} : LargeNotificationProps) {
    const [animation] = useState(new Animated.Value(0))
    const { width } = Dimensions.get('window')

    useEffect(() => {
        // Slide in
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start()

        // Auto hide after duration
        const timer = setTimeout(() => {
            hideNotification()
        }, duration)

        return () => clearTimeout(timer)
    }, [])

    const hideNotification = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onClose?.()
        })
    }

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 0],
    })

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
    return (
        <AnimatedTouchableOpacity
            className={`absolute top-0 left-0 right-0 min-h-[100px] z-50 shadow-lg ${NOTIFICATION_COLORS[type]}`}
            style={[
                { transform: [{ translateY }] },
            ]}
            onPress={() => {
                onPress?.()
                hideNotification()
            }}
            activeOpacity={0.9}>
            <View className="flex-row p-5 items-center justify-between">
                <View className="flex-1 mr-3">
                    <Text className="text-white text-lg font-bold mb-1">
                        {title}
                    </Text>
                    <Text className="text-white text-base">
                        {message}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={hideNotification}
                    className="p-2">
                    <Text className="text-white text-2xl font-bold">×</Text>
                </TouchableOpacity>
            </View>
        </AnimatedTouchableOpacity>
    )
}

