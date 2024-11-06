import { useState } from "react";

/*
 * use like this:
 *
 * const forceRender = useForceRender()
 */
export function useForceRender() {
    const [dummy,setDummy] = useState(false)
    return () => {
        setDummy(!dummy)
    }
}