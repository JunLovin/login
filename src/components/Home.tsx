import { useState, useEffect } from "react"
import { Bell, Moon, Sun, User, LogOut, Mail, Linkedin, Github, Youtube } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { useNavigate } from "react-router"
import Footer from "./Footer"
import Toast from "./Toast"

function Home() {
    const [darkMode, setDarkMode] = useState(true)
    const [showToast, setShowToast] = useState(false)
    const [status, setStatus] = useState('')
    const user = JSON.parse(localStorage.getItem('user') || JSON.stringify('usuario'))
    const [email, setEmail] = useState(user)
    const [fullName, setFullName] = useState('')
    const [avatar, setAvatar] = useState<File | null>(null)
    const navigate = useNavigate()
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_ANON_KEY as string)
    const userEmail = user.includes('@') ? user.split('@')[0] : user

    const logOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            setStatus('Error al cerrar sesión')
            setShowToast(true)
            setTimeout(() => {
                setStatus("")
                setShowToast(false)
            }, 2000)
            return
        }
        localStorage.clear()
        navigate('/')
    }

    useEffect(() => {
        supabase.auth.getSession().then((res) => {
            if (res.data.session) {
                console.log(res)
                navigate('/home')
                localStorage.setItem('user', JSON.stringify(res.data.session.user.email))
                if (res.data.session.user.user_metadata.avatar_url) {
                    localStorage.setItem('avatar', JSON.stringify(res.data.session.user.user_metadata.avatar_url))
                }
                if (res.data.session.user.user_metadata.full_name) {
                    localStorage.setItem('full_name', JSON.stringify(res.data.session.user.user_metadata.full_name))
                }
            }
        })
    }, [])

    const makeBlobUrl = (el: File) => {
        return URL.createObjectURL(el)
    }


    return (
        <>
            <Toast show={showToast} message={status} onClose={() => setShowToast(false)} type={status && status.startsWith('Error') ? 'error' : 'success'} />
            <div className="home-container h-dvh relative overflow-hidden w-full">
                <div className="ball absolute size-90 dark:bg-yellow-500 bg-yellow-300 top-0 right-0 rounded-full animate-blob transition-all duration-300"></div>
                <div className="ball absolute size-90 dark:bg-green-500 bg-green-300 bottom-0 right-20 rounded-full animate-blob animation-delay-5000 transition-all duration-300"></div>
                <div className="ball absolute size-90 dark:bg-pink-500 bg-pink-300 bottom-0 left-40 rounded-full animate-blob animation-delay-2000 transition-all duration-300"></div>
                <div className="ball absolute size-100 dark:bg-purple-500 bg-purple-300 top-20 left-20 rounded-full animate-blob animation-delay-4000 transition-all duration-300"></div>
                <div className="overlay backdrop-blur-xl w-full h-dvh flex flex-col">
                    <div className="header-container">
                        <div className="dashboard-header h-25 flex justify-between px-12 items-center dark:bg-black/15 bg-white/30">
                            <div className="header-left flex gap-4 items-center">
                                <div className="user-pfp-container">
                                    <div className="bg-gradient-to-r from-indigo-500 rounded-full to-purple-300 text-white stroke-white size-12">
                                        {JSON.parse(localStorage.getItem('avatar') || JSON.stringify('usuario')) ? (
                                            <img src={JSON.parse(localStorage.getItem('avatar') || JSON.stringify('http://placebear.com/250/250'))} alt="user avatar" className="w-full h-full rounded-full" />
                                        ) : (
                                            <User className="w-full h-full" />
                                        )}
                                    </div>
                                </div>
                                <div className="text flex flex-col gap-2">
                                    <h2 className="dark:text-white font-bold text-2xl text-black">Dashboard</h2>
                                    <p className="text-slate-400">Bienvenido de vuelta, {JSON.parse(localStorage.getItem('full_name') || JSON.stringify(userEmail) || JSON.stringify('usuario'))}</p>
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
                                        logOut()
                                    }}>
                                        <LogOut />
                                    </button>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="main-container flex-1 w-full flex gap-8 justify-evenly items-center px-8">
                        <div className="dashboard-content-left grid justify-items-center items-center grid-rows-2 gap-6 w-[65%]">
                            <div className="edit-profile w-full h-full bg-white/20 rounded-lg shadow-lg p-8 dark:bg-black/30 backdrop-blur-xl flex flex-col justify-center gap-4">
                                <h2 className="font-bold text-2xl max-sm:text-xl dark:text-white leading-normal">Editar Perfil</h2>
                                <form action="" onSubmit={e => e.preventDefault()} className="flex flex-col justify-center items-start gap-4 dark:text-white w-full">
                                    <div className="email flex flex-col gap-2 w-full">
                                        <label htmlFor="email" className="font-semibold text-neutral-500 dark:text-white w-max">Email</label>
                                        <div className="input-email relative w-full">
                                            <input type="email" name="email" id="email" value={user} className="w-full border dark:border-white/20 border-black/20 outline-0 focus:border-white/20 focus:ring-1 focus:ring-white/20 rounded-md p-2 px-10" />
                                            <Mail className="absolute left-2.5 top-[9px]" />
                                        </div>
                                    </div>
                                    <div className="full_name flex flex-col gap-2 w-full relative">
                                        <label htmlFor="full_name" className="font-semibold text-neutral-500 dark:text-white w-max">Nombre</label>
                                        <div className="input-name relative w-full">
                                            <input type="text" name="full_name" id="full_name" placeholder="Jhon Doe" className="w-full border dark:border-white/20 border-black/20 outline-0 focus:border-white/20 focus:ring-1 focus:ring-white/20 rounded-md p-2 px-10" />
                                            <User className="absolute left-2.5 top-[9px]" />
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md w-full text-white py-3 cursor-pointer font-semibold">Guardar</button>
                                </form>
                            </div>
                            <div className="edit-avatar w-full h-full bg-white/20 rounded-lg shadow-lg p-8 dark:bg-black/30 backdrop-blur-xl flex justify-evenly gap-4 items-center ">
                                <div className="edit-avatar-left-preview flex justify-center w-[50%]">
                                    <div className="avatar-preview size-52 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                                        <img src={avatar ? makeBlobUrl(avatar) : JSON.parse(localStorage.getItem('avatar') || JSON.stringify('http://placebear.com/250/250')) } alt="user avatar" className="w-full h-full rounded-full object-cover" />
                                    </div>
                                </div>
                                <div className="it-avatar-right-uploads w-full flex justify-center items-center dark:text-white">
                                    <div className="upload-avatar flex flex-col items-start justify-center gap-2">
                                        <label htmlFor="avatar" className="font-semibold text-neutral-500 dark:text-white w-max">Avatar</label>
                                        <input type="file" name="avatar" id="avatar" className="w-full border dark:border-white/20 border-black/20 outline-0 focus:border-white/20 focus:ring-1 focus:ring-white/20 rounded-md p-2 px-10" onChange={(e) => {
                                            setAvatar(e.target.files?.[0] || null)
                                            console.log(e.target.files)
                                        }} />
                                        <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md w-full text-white py-3 cursor-pointer font-semibold">Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-content-right flex h-[95%] relative w-[35%]">
                            <div className="creator-info w-full rounded-md h-full bg-white/50 dark:bg-black/30 backdrop-blur-xl p-8 shadow-xl">
                                <h2 className="dark:text-white font-bold text-2xl max-sm:text-xl leading-normal mb-4">Información del creador</h2>
                                <div className="social-networks flex flex-col gap-2">
                                    <div className="discord cursor-pointer flex gap-4 items-cente  bg-neutral-300/50 dark:bg-gray-900/50 p-2 rounded-lg">
                                        <div className="discord-left bg-purple-500/50 w-max p-2 rounded-lg border border-purple-900">
                                            <svg viewBox="0 0 256 199" width="36" height="36" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" className="fill-purple-600"/></svg>
                                        </div>
                                        <div className="discord-right dark:text-white flex flex-col justify-between">
                                            <h3 className="font-semibold">Únete a mi comunidad de Discord</h3>
                                            <p className="text-slate-400 text-sm">Syntax World</p>
                                        </div>
                                    </div>
                                    <div className="linkedin cursor-pointer flex gap-4 items-cente  bg-neutral-300/50 dark:bg-gray-900/50 p-2 rounded-lg">
                                        <div className="linkedin-left bg-cyan-500/50 w-max p-2 rounded-lg border border-cyan-900">
                                            <Linkedin className="text-white dark:text-cyan-500 w-8 h-8" />
                                        </div>
                                        <div className="linkedin-right dark:text-white flex flex-col justify-between">
                                            <h3 className="font-semibold">LinkedIn</h3>
                                            <p className="text-slate-400 text-sm">@saidre20</p>
                                        </div>
                                    </div>
                                    <div className="github cursor-pointer flex gap-4 items-cente  bg-neutral-300/50 dark:bg-gray-900/50 p-2 rounded-lg">
                                        <div className="github-left bg-black/50 w-max p-2 rounded-lg border border-black">
                                            <Github className="text-white w-8 h-8"/>
                                        </div>
                                        <div className="github-right dark:text-white flex flex-col justify-between">
                                            <h3 className="font-semibold">Revisa mis proyectos</h3>
                                            <p className="text-slate-400 text-sm">@JunLovin</p>
                                        </div>
                                    </div>
                                    <div className="youtube cursor-pointer flex gap-4 items-cente bg-neutral-300/50 dark:bg-gray-900/50 p-2 rounded-lg">
                                        <div className="youtube-left bg-red-500/50 w-max p-2 rounded-lg border border-red-900">
                                            <Youtube className="text-red-500 w-8 h-8" />
                                        </div>
                                        <div className="discord-right dark:text-white flex flex-col justify-between">
                                            <h3 className="font-semibold">Mira mis videos</h3>
                                            <p className="text-slate-400 text-sm">@saidr07</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-black/80 text-white h-12 w-[80%] left-1/2 -translate-x-1/2 absolute bottom-4 rounded-md cursor-pointer">Ver Repositorio</button>
                        </div>
                    </div>
                    <div className="footer-container flex justify-center items-center text-slate-400 text-sm">
                        <p>© 2025 Todos los derechos reservados</p>
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