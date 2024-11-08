import { addOrientationChangeListener, getOrientationAsync, Orientation } from "expo-screen-orientation";
import { useEffect, useState } from "react";



export function useScreenOrientation() {

    const[orientation,setOrientation] = useState<Orientation>()

    useEffect(() => {
        /* registration */
        const listener = async () => {
            const o = await getOrientationAsync()
            setOrientation(o)
        }
        listener()  // wert einmalig setzen
        const subscription = addOrientationChangeListener(listener)
        return () => {
            /* cleanup */
            subscription.remove()
        }
    }, []) // wichtig, Dependency Array nicht vergessen
    return orientation
}

export function orientationToString(orientation?: Orientation) {
    switch(orientation) {
        case Orientation.UNKNOWN:
            return "Unknown"
        case Orientation.LANDSCAPE_LEFT:
            return "Landscape Left"
        case Orientation.LANDSCAPE_RIGHT:
            return "Landscape Right"
        case Orientation.PORTRAIT_DOWN:
            return "Portrait Down"
        case Orientation.PORTRAIT_UP:
            return "Portrait Up"
        default:
            return "Not initialized"
    }
}