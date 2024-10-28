import React from 'react';
import {
    Animated,
    Dimensions,
    FlatListProps,
    View
} from 'react-native';

type ItemData = {
    id: string | number;
    title: string;
};

// Extend FlatListProps to properly type the component
type AnimatedFlatListProps<T> = Omit<FlatListProps<T>, 'renderItem'> & {
    renderCustomItem?: (props: {
        item: T;
        index: number;
        scrollY: Animated.Value;
        itemHeight: number;
    }) => React.ReactElement;
    itemHeight?: number;
};

export function AnimatedFlatList<T extends ItemData>({
    data,
    renderCustomItem,
    itemHeight = 70,
    ...flatListProps
}: AnimatedFlatListProps<T>) {
    const scrollY = new Animated.Value(0);
    const { width } = Dimensions.get('window');

    const defaultRenderItem = ({
        item,
        index
    }: {
        item: T;
        index: number
    }) => {
        // Create animation ranges
        const inputRange = [
            -1,
            0,
            itemHeight * index,
            itemHeight * (index + 2)
        ];

        // Animation configurations
        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
        });

        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
        });

        const translateX = scrollY.interpolate({
            inputRange,
            outputRange: [0, 0, 0, width]
        });

        return (
            <Animated.View
                className="mb-4"
                style={{
                    height: itemHeight,
                    transform: [
                        { scale },
                        { translateX }
                    ],
                    opacity
                }}
            >
                <View className="bg-gray-100 p-4 rounded-lg h-full justify-center">
                    <Animated.Text className="text-base font-medium">
                        {item.title}
                    </Animated.Text>
                </View>
            </Animated.View>
        );
    };

    const renderItem = (props: { item: T; index: number }) => {
        if (renderCustomItem) {
            return renderCustomItem({
                ...props,
                scrollY,
                itemHeight
            });
        }
        return defaultRenderItem(props);
    };

    return (
        <Animated.FlatList<T>
            {...flatListProps}
            data={data}
            renderItem={renderItem}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={flatListProps.contentContainerStyle || { padding: 16 }}
            keyExtractor={item => item.id.toString()}
        />
    );
};

