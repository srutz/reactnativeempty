import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// 1. Typ für Context definieren
type CountContextType = {
    count: number
    setCount: (n: number) => void
}

// 2. Global den Context mit createContext anlegen
const CountContext = createContext<CountContextType|undefined>(undefined)

// 3. Provider Komponente definieren
type CountContextProviderType = {
    children: ReactNode
}

export function CountContextProvider(props: CountContextProviderType) {
    const { children } = props
    const [count, setCount] = useState(1)
    const value = {
        count: count,
        setCount: setCount
    }
    return (
        <CountContext.Provider value={ value }>
            {children}
        </CountContext.Provider>
    )
}

// 4. useCountContext helper-funktion
export function useCountContext() {
    const context = useContext(CountContext)
    if (!context) {
        throw new Error("context provider for countcontext not set")
    }
    return context
}
