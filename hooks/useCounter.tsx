import { useEffect, useState } from "react"

export function useCounter(intervalMillis: number) {
    const [count, setCount] = useState(1)

    /* useEffect kann 3 Dinge: on-mounted, on-unmounted, listener sein */
    useEffect(() => {
        // registrieren
        console.log("running effect")
        const intervalid = setInterval(() => {
            setCount((c) => c + 1)
        }, intervalMillis)

        return () => {
            // cleanup
            console.log("unmounted")
            clearInterval(intervalid)
        }
    }, [])
    return count
}