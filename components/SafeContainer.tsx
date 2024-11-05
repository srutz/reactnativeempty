
import React, { ReactNode } from 'react';
import { SafeAreaView, View, Platform, StatusBar, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type SafeContainerProps = {
    children: ReactNode, 
    customClasses?: string,
    style?: StyleProp<ViewStyle> 
}

export function SafeContainer({ children, customClasses, style }: SafeContainerProps) {
    const androidStatusBarHeight = Platform.OS === 'android' 
        ? StatusBar.currentHeight : 0;

    return (
        <View className={"w-full flex-1 " + (customClasses ?? "")} >
            <StatusBar />
            {Platform.OS === 'android' ? (
                // Android implementation
                <View style={[
                    styles.androidSafeArea,
                    { paddingTop: androidStatusBarHeight },
                    style
                ]}>{children}</View>
            ) : (
                // iOS implementation
                <SafeAreaView style={[styles.iosSafeArea, style]}>{children}</SafeAreaView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    iosSafeArea: {
        flex: 1,
    },
    androidSafeArea: {
        flex: 1,
    }
})
