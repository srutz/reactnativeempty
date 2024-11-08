import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ReactNode } from "react";
import { View } from "react-native";

export function MyBottomSheet({ children, height = 32 }: { children: ReactNode, height?: number }) {
    return (
        <>
            { /* placeholder view, nur um platz für den overlay zu reservieren */ }
            <View className={"h-[" + height + "]"}></View>
            <BottomSheet snapPoints={[height, "50%"]}>
                <BottomSheetView className="flex-1 flex flex-col">
                    <View className="flex flex-col gap-2">
                        {children}
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </>
    )
}