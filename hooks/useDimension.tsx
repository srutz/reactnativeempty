import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

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
export type DimensionType3 = ScaledSize


export function useDimension() {
    // State, damit der Benutzer von useDimension neu gerendert wird (reaktivität) */
    const [ dimension, setDimension ] = useState<DimensionType>(Dimensions.get("window"))

    useEffect(() => {
        /* registration */
        const cleanupHandle = Dimensions.addEventListener("change", () => {
            console.log("dimensions changed: ", Dimensions.get("window"))
            // im listener, also bei ereignis-eintritt den state ändern
            setDimension(Dimensions.get("window"))
        })
        return () => {
            /* cleanup */
            cleanupHandle.remove()
        }
    }, []) // wichtig, Dependency Array nicht vergessen
    return dimension
}