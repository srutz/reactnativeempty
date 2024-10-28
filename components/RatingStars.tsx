import { MaterialIcons } from '@expo/vector-icons';

import { ReactNode } from "react";
import { View } from "react-native";

export function RatingStars( { stars, maxStars = 5}: { stars: number, maxStars?: number } ) {
    const l: ReactNode[] = []
    for (let i = 0; i < maxStars; i++) {
        const active = i < stars
        l.push(<MaterialIcons key={"start" + (i + 1)} name="star" size={20} color={active ? "gold" : "gray"} />)
    }
    return (
        <View className="flex-row">
            {l}
        </View>
    )
}