import { useEffect } from "react";
import { Dimensions } from "react-native";

/*
 * Custom Hook um reaktiv Dimensionsänderungen mitzubekommen
 * Typische Verwendung von useEffect und useState
 * useEffect um Listener an- und abzumelden
 * useState um Reaktiv zu sein. (Rerendings auslösen)
 * 
 * Immer gleiches Pattern.. Registration und Clean von Listeners
 */

/* type with: width, height, scale, fontScale */
export type DimensionType = ReturnType<typeof Dimensions.get>
export type DimensionType2 = { width: number, height: number, scale: number, fontScale: number }


export function useDimension() {

    useEffect(() => {
        /* registration */
        const cleanupHandle = Dimensions.addEventListener("change", () => {
            console.log("dimensions changed: ", Dimensions.get("window"))
        })
        return () => {
            /* cleanup */
            cleanupHandle.remove()
        }
    }, []) // wichtig, Dependency Array nicht vergessen

}