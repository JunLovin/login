import React, { useContext, createContext, useState, type SetStateAction, type Dispatch, type ReactNode } from 'react'
import Loading from '../components/Loading'

const LoadingContext = createContext<{ loading: boolean, setLoading: Dispatch<SetStateAction<boolean>>} | null>(null)

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-unused-vars
export function LoadingProvider({ children } : { children: ReactNode }) {
    const [loading, setLoading] = useState(false)

    return (
        <>
            <LoadingContext.Provider value={{ loading, setLoading }}>
                {loading && <Loading/>}
                {children}
            </LoadingContext.Provider>
        </>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => {
    const context = useContext(LoadingContext)
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider")
    }
    return context
}