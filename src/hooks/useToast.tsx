import { useContext, createContext, useState } from "react";
import Toast from "../components/Toast";

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext<{ showToastMessage: (message: string, type?: "success" | "error") => void } | null>(null)

export function ToastProvider({ children } : { children: React.ReactNode }) {
    const [showToast, setShowToast] = useState(false)
    const [status, setStatus] = useState('')
    const [type, setType] = useState<'success' | 'error'>('success')

    const showToastMessage = (message: string, type: "success" | "error" = "success") => {
        setStatus(message)
        setType(type)
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 2000)
    }

    return (
        <>
        <ToastContext.Provider value={{showToastMessage}}>
            {children}
            <Toast show={showToast} message={status} onClose={() => setShowToast(false)} type={type} />
        </ToastContext.Provider>
        </>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}