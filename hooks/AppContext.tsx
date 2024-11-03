import React, { createContext, ReactNode, useContext, useState } from "react";

export type AppContextType = {
    authenticated: boolean
    setAuthenticated: (value: boolean) => void
    infos: string
}

const AppContext = createContext<AppContextType | null>(null)


export function AppContextProvider({ children }: { children: ReactNode }) {
    const [authenticated, setAuthenticated] = useState(false)
    return <AppContext.Provider value={{ authenticated, setAuthenticated, infos: ""}}>{children}</AppContext.Provider>
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (context == null) {
        throw new Error("useAppContext must be used within a AppContextProvider")
    }
    return context
}

