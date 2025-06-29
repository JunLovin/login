import { useState } from "react"
import { Bell, Moon, Sun, User, LogOut } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { useNavigate } from "react-router"
import Footer from "./Footer"

function Home() {
    const [darkMode, setDarkMode] = useState(true)
    const navigate = useNavigate()
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_ANON_KEY as string)

    const logOut = async () => {
        const { data, error } = await supabase.auth.signOut()
        if (error) {
            console.error(error)
            return
        }
        console.log(data)
        navigate('/')
    }

    return (
        <>
            <div className="home-container h-dvh relative overflow-hidden w-full">
                <div className="ball absolute size-90 dark:bg-yellow-500 bg-yellow-300 top-0 right-0 rounded-full animate-blob transition-all duration-300"></div>
                <div className="ball absolute size-90 dark:bg-green-500 bg-green-300 bottom-0 right-20 rounded-full animate-blob animation-delay-5000 transition-all duration-300"></div>
                <div className="ball absolute size-90 dark:bg-pink-500 bg-pink-300 bottom-0 left-40 rounded-full animate-blob animation-delay-2000 transition-all duration-300"></div>
                <div className="ball absolute size-100 dark:bg-purple-500 bg-purple-300 top-20 left-20 rounded-full animate-blob animation-delay-4000 transition-all duration-300"></div>
                <div className="overlay backdrop-blur-xl w-full min-h-dvh flex flex-col">
                    <div className="header-container">
                        <div className="dashboard-header h-25 flex justify-between px-12 items-center dark:bg-black/15 bg-white/30">
                            <div className="header-left flex gap-4 items-center">
                                <div className="user-pfp-container">
                                    <div className="bg-gradient-to-r from-indigo-500 p-2 rounded-full to-purple-300 text-white stroke-white">
                                        <User className="size-8" />
                                    </div>
                                </div>
                                <div className="text flex flex-col gap-2">
                                    <h2 className="dark:text-white font-bold text-2xl text-black">Dashboard</h2>
                                    <p className="text-slate-400">Bienvenido de vuelta, Juan</p>
                                </div>
                            </div>
                            <div className="header-right">
                                <ul className="flex gap-4">
                                    <button className="cursor-pointer p-2 bg-white/50 hover:bg-white/40 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50 transition-all duration-200 w-max h-max rounded-md dark:text-white text-black">
                                        <Bell />
                                    </button>
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
                                        logOut()
                                    }}>
                                        <LogOut />
                                    </button>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="main-container">

                    </div>
                    <div className="footer-container">
                        <Footer />
                    </div>
                </div>
            </div>
            <style>{`
            @keyframes blob {
            0% {
                transform: translate(0px, 0px) scale(1);
            }
            33% {
                transform: translate(30px, -50px) scale(1.1);
            }
            66% {
                transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
                transform: translate(0px, 0px) scale(1);
            }
            }
            .animate-blob {
            animation: blob 7s infinite;
            }
            .animation-delay-2000 {
            animation-delay: 2s;
            }
            .animation-delay-4000 {
            animation-delay: 4s;
            }
        `}</style>
        </>
    )
}

export default Home