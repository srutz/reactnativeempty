import * as ScreenOrientation from "expo-screen-orientation"
import { useEffect, useState } from "react"

export function useScreenOrientation() {

    const[orientation,setOrientation] = useState<ScreenOrientation.Orientation>()

    useEffect(() => {
        /* registration */
        const listener = async () => {
            const o = await ScreenOrientation.getOrientationAsync()
            setOrientation(o)
        }
        listener()  // wert einmalig setzen
        const subscription = ScreenOrientation.addOrientationChangeListener(listener)
        return () => {
            /* cleanup */
            subscription.remove()
        }
    }, []) // wichtig, Dependency Array nicht vergessen
    return orientation
}

export function orientationToString(orientation?: ScreenOrientation.Orientation) {
    switch(orientation) {
        case ScreenOrientation.Orientation.UNKNOWN:
            return "Unknown"
        case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
            return "Landscape Left"
        case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
            return "Landscape Right"
        case ScreenOrientation.Orientation.PORTRAIT_DOWN:
            return "Portrait Down"
        case ScreenOrientation.Orientation.PORTRAIT_UP:
            return "Portrait Up"
        default:
            return "Not initialized"
    }
}