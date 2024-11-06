import { useEffect, useState } from "react"

export function useInterval(callback: () => void, intervalMillis: number) {
    useEffect(() => {
        const intervalid = setInterval(() => {
            callback()
        }, intervalMillis)

        return () => {
            // cleanup
            clearInterval(intervalid)
        }
    }, [])
}