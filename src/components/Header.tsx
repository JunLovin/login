import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'

function Header() {
    const [darkMode, setDarkMode] = useState<boolean>(true)

    return (
        <>
        <header className="h-15 flex items-center justify-end w-full absolute px-8 max-sm:px-4 dark:text-slate-200 text-blue-950">
                <span className="cursor-pointer p-2 bg-white/50 hover:bg-white/40 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50 transition-all duration-200 w-max h-max rounded-md" onClick={() => {
                    setDarkMode(!darkMode)
                    document.body.classList.toggle('dark')
                }}>
                    {!darkMode ? (
                        <Moon className="stroke-purple-500 p-0.5"/>
                    ) : (
                        <Sun className="stroke-yellow-500 p-0.5" />
                    )}
                </span>
        </header>
        </>
    )
}

export default Header