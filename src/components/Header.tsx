import { useState } from 'react'
import { Sun, Moon, LogOut } from 'lucide-react'

type Header = {
    dashboard: boolean,
    avatarUrl?: string,
    username?: string,
    logOut?: () => void
}

function Header({ dashboard = false, avatarUrl, username, logOut, }: Header) {
    const [darkMode, setDarkMode] = useState<boolean>(true)

    return (
        <>
            {!dashboard && (
                <header className="h-15 flex items-center justify-end w-full absolute px-8 max-sm:px-4 dark:text-slate-200 text-blue-950">
                    <span className="cursor-pointer p-2 bg-white/50 hover:bg-white/40 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50 transition-all duration-200 w-max h-max rounded-md" onClick={() => {
                        setDarkMode(!darkMode)
                        document.body.classList.toggle('dark')
                    }}>
                        {!darkMode ? (
                            <Moon className="stroke-purple-500 p-0.5" />
                        ) : (
                            <Sun className="stroke-yellow-500 p-0.5" />
                        )}
                    </span>
                </header>
            )}

            {dashboard && (
                <div className="header-container">
                    <div className="dashboard-header h-25 flex justify-between px-12 items-center dark:bg-black/15 bg-white/30">
                        <div className="header-left flex gap-4 items-center">
                            <div className="user-pfp-container">
                                <div className="bg-gradient-to-r from-indigo-500 rounded-full to-purple-300 text-white stroke-white size-12">
                                    <img src={avatarUrl} alt="user avatar" className="w-full h-full rounded-full object-cover" />
                                </div>
                            </div>
                            <div className="text flex flex-col gap-2">
                                <h2 className="dark:text-white font-bold text-2xl text-black max-sm:text-xl">Dashboard</h2>
                                <p className="text-slate-400 text-sm max-sm:hidden">Bienvenido de vuelta, {username}</p>
                            </div>
                        </div>
                        <div className="header-right">
                            <ul className="flex gap-4">
                                <button className="cursor-pointer p-2 bg-white/50 hover:bg-white/40 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50 transition-all duration-200 w-max h-max rounded-md" onClick={() => {
                                    setDarkMode(!darkMode)
                                    document.body.classList.toggle('dark')
                                }}>
                                    {!darkMode ? (
                                        <Moon className="stroke-purple-500 p-0.5" />
                                    ) : (
                                        <Sun className="stroke-yellow-500 p-0.5" />
                                    )}
                                </button>
                                <button className="cursor-pointer p-2 bg-white/50 hover:bg-white/40 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50 transition-all duration-200 w-max h-max rounded-md dark:text-white text-black" onClick={() => {
                                    logOut!()
                                }}>
                                    <LogOut />
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header